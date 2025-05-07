import { useState } from 'react'
import { useNavigate } from 'react-router'
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

type Exercise = {
  name: string
  description: string
  muscleCategory: string
}

const muscleCategories = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Full Body',
  'Cardio'
]

export default function ExerciseForm({
  exercise = null
}: {
  exercise?: Exercise | null
}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: exercise?.name || '',
    description: exercise?.description || '',
    muscleCategory: exercise?.muscleCategory || ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, muscleCategory: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving exercise:', formData)

    navigate('/dashboard/exercises')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Exercise Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Bench Press"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the exercise and proper form..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="muscleCategory">Muscle Category</Label>
        <Select
          value={formData.muscleCategory}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger id="muscleCategory">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {muscleCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
