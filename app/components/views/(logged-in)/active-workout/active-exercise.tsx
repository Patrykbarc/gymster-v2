'use client'

import { CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface Set {
  reps: number
  weight: number
  completed: boolean
}

interface Exercise {
  sets: Set[]
}

interface ActiveExerciseProps {
  exercise: Exercise
  exerciseIndex: number
  onSetComplete: (
    exerciseIndex: number,
    setIndex: number,
    completed: boolean,
    weight: number,
    reps: number
  ) => void
  isActive: boolean
}

export default function ActiveExercise({
  exercise,
  exerciseIndex,
  onSetComplete,
  isActive
}: ActiveExerciseProps) {
  const [setData, setSetData] = useState<Set[]>(
    exercise.sets.map((set: Set) => ({
      reps: set.reps,
      weight: set.weight || 0,
      completed: set.completed
    }))
  )

  const handleSetComplete = (setIndex: number, completed: boolean) => {
    const updatedSetData = [...setData]
    updatedSetData[setIndex].completed = completed
    setSetData(updatedSetData)

    onSetComplete(
      exerciseIndex,
      setIndex,
      completed,
      updatedSetData[setIndex].weight,
      updatedSetData[setIndex].reps
    )
  }

  const handleInputChange = (
    setIndex: number,
    field: keyof Set,
    value: number | boolean
  ) => {
    const updatedSetData = [...setData]
    switch (field) {
      case 'reps':
      case 'weight':
        updatedSetData[setIndex][field] = value as number
        break
      case 'completed':
        updatedSetData[setIndex][field] = value as boolean
        break
    }
    setSetData(updatedSetData)
  }

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground grid grid-cols-12 gap-2 text-sm font-medium">
        <div className="col-span-1">Set</div>
        <div className="col-span-3 md:col-span-2">Weight</div>
        <div className="col-span-3 md:col-span-2">Reps</div>
        <div className="col-span-5 md:col-span-7">Complete</div>
      </div>

      {exercise.sets.map((set: Set, setIndex: number) => (
        <div key={setIndex} className="grid grid-cols-12 items-center gap-2">
          <div className="col-span-1 font-medium">{setIndex + 1}</div>
          <div className="col-span-3 md:col-span-2">
            <Input
              type="number"
              min="0"
              step="2.5"
              value={setData[setIndex].weight}
              onChange={(e) =>
                handleInputChange(
                  setIndex,
                  'weight',
                  Number.parseFloat(e.target.value) || 0
                )
              }
              className="h-8"
              disabled={setData[setIndex].completed || !isActive}
            />
          </div>
          <div className="col-span-3 md:col-span-2">
            <Input
              type="number"
              min="0"
              value={setData[setIndex].reps}
              onChange={(e) =>
                handleInputChange(
                  setIndex,
                  'reps',
                  Number.parseInt(e.target.value) || 0
                )
              }
              className="h-8"
              disabled={setData[setIndex].completed || !isActive}
            />
          </div>
          <div className="col-span-5 flex gap-2 md:col-span-7">
            {setData[setIndex].completed ? (
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => handleSetComplete(setIndex, false)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Mark Incomplete
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => handleSetComplete(setIndex, true)}
                disabled={!isActive}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Set
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
