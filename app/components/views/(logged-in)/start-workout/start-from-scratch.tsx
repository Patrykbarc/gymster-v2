'use client'

import { Play, Plus, Trash2 } from 'lucide-react'
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

const availableExercises = [
  { id: '1', name: 'Bench Press', muscleCategory: 'Chest' },
  { id: '2', name: 'Squat', muscleCategory: 'Legs' },
  { id: '3', name: 'Deadlift', muscleCategory: 'Back' },
  { id: '4', name: 'Pull-up', muscleCategory: 'Back' },
  { id: '5', name: 'Shoulder Press', muscleCategory: 'Shoulders' },
  { id: '6', name: 'Bicep Curl', muscleCategory: 'Arms' },
  { id: '7', name: 'Tricep Extension', muscleCategory: 'Arms' },
  { id: '8', name: 'Leg Press', muscleCategory: 'Legs' }
]

type Exercise = {
  id: string
  exerciseId: string
  sets: number
  reps: number
}

export function StartFromScratch() {
  const navigation = useNavigate()
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now().toString(), exerciseId: '', sets: 3, reps: 10 }
    ])
  }

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value as never
    setExercises(updatedExercises)
  }

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleStartWorkout = () => {
    if (exercises.length > 0) {
      const workoutData = {
        name: workoutName || 'Custom Workout',
        exercises: exercises.map((ex) => {
          const exerciseDetails = availableExercises.find(
            (e) => e.id === ex.exerciseId
          )
          return {
            ...ex,
            name: exerciseDetails?.name || 'Unknown Exercise'
          }
        })
      }
      console.log('Starting custom workout:', workoutData)
      navigation(`/active-workout?custom=true`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workoutName">Workout Name (Optional)</Label>
        <Input
          id="workoutName"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="e.g., My Custom Workout"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Exercises</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExercise}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </div>

        {exercises.length > 0 ? (
          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="flex items-center gap-2 rounded-md border p-3"
              >
                <div className="grid flex-1 gap-4 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`exercise-${index}`} className="sr-only">
                      Exercise
                    </Label>
                    <Select
                      value={exercise.exerciseId}
                      onValueChange={(value) =>
                        handleExerciseChange(index, 'exerciseId', value)
                      }
                    >
                      <SelectTrigger id={`exercise-${index}`}>
                        <SelectValue placeholder="Select exercise" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableExercises.map((ex) => (
                          <SelectItem key={ex.id} value={ex.id}>
                            {ex.name} ({ex.muscleCategory})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`sets-${index}`} className="sr-only">
                      Sets
                    </Label>
                    <Input
                      id={`sets-${index}`}
                      type="number"
                      min="1"
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          'sets',
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor={`reps-${index}`} className="sr-only">
                      Reps
                    </Label>
                    <Input
                      id={`reps-${index}`}
                      type="number"
                      min="1"
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          'reps',
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveExercise(index)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground text-sm">
              No exercises added. Click "Add Exercise" to start building your
              workout.
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={handleStartWorkout}
        className="w-full"
        disabled={exercises.length === 0}
      >
        <Play className="mr-2 h-4 w-4" />
        Start Workout
      </Button>
    </div>
  )
}
