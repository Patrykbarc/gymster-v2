import { difficulties } from '../schema/schema'
import type { FormField } from '../types/types'

export const formFields: FormField[] = [
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
