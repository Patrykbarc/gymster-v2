import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  useForm,
  type UseFormRegister,
  type UseFormSetValue
} from 'react-hook-form'
import { Form, useNavigate } from 'react-router'
import { DraftAlertDialog } from '~/components/shared/draft-alert-dialog/draft-alert-dialog'
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
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import { type ExerciseInsert } from '~/services/api/exercises/types'
import { formFields } from './const/form-fields'
import { handleArrayChange } from './helper/handleArrayChange'
import { schema } from './schema/schema'
import type { ExerciseFormProps, FormData, FormField } from './types/types'

export function ExerciseForm({ exercise = null, userId }: ExerciseFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: exercise?.name || '',
      description: exercise?.description || null,
      muscle_group: exercise?.muscle_group?.join(', ') || null,
      difficulty: exercise?.difficulty || 'beginner',
      equipment: exercise?.equipment?.join(', ') || null,
      instructions: exercise?.instructions?.join('\n') || null,
      video_url: exercise?.video_url || null,
      image_url: exercise?.image_url || null
    }
  })

  const storageKey = exercise?.id
    ? `exercise-draft-${exercise.id}`
    : 'exercise-draft'

  const [exerciseDraft, setExerciseDraft] = useLocalStorage<FormData | null>(
    storageKey,
    null
  )

  const [isDraftDialogOpen, setIsDraftDialogOpen] = useState(false)
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false)

  const name = watch('name')
  const description = watch('description')
  const muscle_group = watch('muscle_group')
  const difficulty = watch('difficulty')
  const equipment = watch('equipment')
  const instructions = watch('instructions')
  const video_url = watch('video_url')
  const image_url = watch('image_url')

  useEffect(() => {
    if (!isInitialCheckDone || isDraftDialogOpen) {
      return
    }

    setExerciseDraft({
      name,
      description,
      muscle_group,
      difficulty,
      equipment,
      instructions,
      video_url,
      image_url
    })
  }, [
    name,
    description,
    muscle_group,
    difficulty,
    equipment,
    instructions,
    video_url,
    image_url,
    setExerciseDraft,
    isDraftDialogOpen,
    isInitialCheckDone
  ])

  useEffect(() => {
    if (isInitialCheckDone) return

    if (
      exerciseDraft &&
      (exerciseDraft.name ||
        exerciseDraft.description ||
        exerciseDraft.muscle_group ||
        exerciseDraft.equipment ||
        exerciseDraft.instructions ||
        exerciseDraft.video_url ||
        exerciseDraft.image_url)
    ) {
      setIsDraftDialogOpen(true)
    } else {
      setIsInitialCheckDone(true)
    }
  }, [exerciseDraft, isInitialCheckDone])

  const onSubmit = async (data: FormData) => {
    try {
      const exerciseData: ExerciseInsert = {
        user_id: userId,
        name: data.name,
        description: data.description,
        muscle_group: handleArrayChange(data.muscle_group),
        difficulty: data.difficulty,
        equipment: handleArrayChange(data.equipment),
        instructions: handleArrayChange(data.instructions),
        video_url: data.video_url,
        image_url: data.image_url
      }

      if (exercise?.id) {
        await exercisesService.updateExercise(exercise.id, exerciseData)
      } else {
        await exercisesService.insertExercise(exerciseData)
      }
      navigate('/dashboard/exercises')

      setExerciseDraft(null)
    } catch (error) {
      console.error('Failed to save exercise:', error)
    }
  }

  return (
    <>
      <DraftAlertDialog
        texts={{
          title: 'Unfinished draft found',
          description:
            "It looks like you have a saved exercise draft. Would you like to continue editing? Discarding this draft can't be undone."
        }}
        isOpen={isDraftDialogOpen}
        onContinue={() => {
          if (exerciseDraft) {
            setValue('name', exerciseDraft.name)
            setValue('description', exerciseDraft.description)
            setValue('muscle_group', exerciseDraft.muscle_group)
            setValue('difficulty', exerciseDraft.difficulty)
            setValue('equipment', exerciseDraft.equipment)
            setValue('instructions', exerciseDraft.instructions)
            setValue('video_url', exerciseDraft.video_url)
            setValue('image_url', exerciseDraft.image_url)
          }
          setIsDraftDialogOpen(false)
          setIsInitialCheckDone(true)
        }}
        onDiscard={() => {
          setExerciseDraft(null)
          setIsDraftDialogOpen(false)
          setIsInitialCheckDone(true)
        }}
      />

      <Form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            {renderField({ field, register, setValue })}
            {errors[field.id] && (
              <p className="text-sm text-red-500">
                {errors[field.id]?.message}
              </p>
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
      </Form>
    </>
  )
}

function renderField({
  field,
  register,
  setValue
}: {
  field: FormField
  register: UseFormRegister<FormData>
  setValue: UseFormSetValue<FormData>
}) {
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
    return <Textarea {...commonProps} rows={field.rows} />
  }

  if (field.type === 'url') {
    return <Input {...commonProps} type="url" />
  }

  return <Input {...commonProps} />
}
