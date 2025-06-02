import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import type { loader } from '~/root'
import {
  exercisesService,
  type ExerciseInsert
} from '~/services/api/exercises/exercisesService'
import { Constants, type Database } from '~/types/database.types'

type Exercise = Database['public']['Tables']['exercises']['Row']

const difficulties = Constants.public.Enums.difficulty_level

const linkSchema = z
  .string()
  .nullable()
  .refine((val) => !val || val.match(/^https?:\/\/.+/), {
    message: 'Must be a valid URL'
  })

const schema = z.object({
  user_id: z.string(),
  name: z.string().min(1),
  description: z.string().nullable(),
  muscle_group: z.array(z.string()).nullable(),
  difficulty: z.enum(difficulties),
  equipment: z.array(z.string()).nullable(),
  instructions: z.array(z.string()).nullable(),
  video_url: linkSchema,
  image_url: linkSchema
})

type FormData = z.infer<typeof schema>

type ExerciseFormProps = {
  exercise?: Exercise | null
}

type FormField = {
  id: keyof FormData
  label: string
  type: 'text' | 'textarea' | 'select' | 'url'
  placeholder: string
  required?: boolean
  options?: readonly string[]
  rows?: number
  isArray?: boolean
  arraySeparator?: 'comma' | 'newline'
}

const formFields: FormField[] = [
  {
    id: 'name',
    label: 'Exercise Name',
    type: 'text',
    placeholder: 'e.g., Bench Press',
    required: true
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Describe the exercise and proper form...',
    rows: 4
  },
  {
    id: 'muscle_group',
    label: 'Muscle Category',
    type: 'text',
    placeholder: 'Enter muscle groups (comma-separated)',
    isArray: true,
    arraySeparator: 'comma'
  },
  {
    id: 'difficulty',
    label: 'Difficulty Level',
    type: 'select',
    placeholder: 'Select difficulty level',
    options: difficulties,
    required: true
  },
  {
    id: 'equipment',
    label: 'Equipment',
    type: 'text',
    placeholder: 'Enter equipment (comma-separated)',
    isArray: true,
    arraySeparator: 'comma'
  },
  {
    id: 'instructions',
    label: 'Instructions',
    type: 'textarea',
    placeholder: 'Enter instructions (one per line)',
    rows: 4,
    isArray: true,
    arraySeparator: 'newline'
  },
  {
    id: 'video_url',
    label: 'Video URL',
    type: 'url',
    placeholder: 'https://example.com/video'
  },
  {
    id: 'image_url',
    label: 'Image URL',
    type: 'url',
    placeholder: 'https://example.com/image.jpg'
  }
]

export function ExerciseForm({ exercise = null }: ExerciseFormProps) {
  const { user } = useLoaderData<typeof loader>()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: user?.id,
      name: exercise?.name || '',
      description: exercise?.description || null,
      muscle_group: exercise?.muscle_group || null,
      difficulty: exercise?.difficulty || 'beginner',
      equipment: exercise?.equipment || null,
      instructions: exercise?.instructions || null,
      video_url: exercise?.video_url || null,
      image_url: exercise?.image_url || null
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      const exerciseData: ExerciseInsert = {
        user_id: data.user_id,
        name: data.name,
        description: data.description,
        muscle_group: data.muscle_group,
        difficulty: data.difficulty,
        equipment: data.equipment,
        instructions: data.instructions,
        video_url: data.video_url,
        image_url: data.image_url
      }

      if (exercise?.id) {
        await exercisesService.updateExercise(exercise.id, exerciseData)
      } else {
        await exercisesService.insertExercise(exerciseData)
      }
      navigate('/dashboard/exercises')
    } catch (error) {
      console.error('Failed to save exercise:', error)
    }
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      ...register(field.id)
    }

    if (field.type === 'select' && field.options) {
      return (
        <Select onValueChange={(value) => setValue(field.id, value)}>
          <SelectTrigger id={field.id}>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (field.type === 'textarea') {
      return (
        <Textarea
          {...commonProps}
          rows={field.rows}
          onChange={(e) => {
            if (field.isArray) {
              const values = e.target.value
                .split('\n')
                .filter((line) => line.trim())
              setValue(field.id, values)
            } else {
              register(field.id).onChange(e)
            }
          }}
        />
      )
    }

    if (field.type === 'url') {
      return <Input {...commonProps} type="url" />
    }

    return (
      <Input
        {...commonProps}
        onChange={(e) => {
          if (field.isArray) {
            const values = e.target.value.split(',').map((item) => item.trim())
            setValue(field.id, values)
          } else {
            register(field.id).onChange(e)
          }
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {formFields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="text-sm text-red-500">{errors[field.id]?.message}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard/exercises')}
        >
          Cancel
        </Button>
        <Button type="submit">
          {exercise ? 'Update Exercise' : 'Create Exercise'}
        </Button>
      </div>
    </form>
  )
}
