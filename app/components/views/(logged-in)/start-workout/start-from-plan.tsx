import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

const workoutPlans = [
  {
    id: '1',
    name: 'Upper Body Split',
    exercises: [
      { id: '1', name: 'Bench Press', sets: 3, reps: 10 },
      { id: '5', name: 'Shoulder Press', sets: 3, reps: 10 },
      { id: '6', name: 'Bicep Curl', sets: 3, reps: 12 },
      { id: '7', name: 'Tricep Extension', sets: 3, reps: 12 }
    ]
  },
  {
    id: '2',
    name: 'Lower Body Split',
    exercises: [
      { id: '2', name: 'Squat', sets: 4, reps: 8 },
      { id: '3', name: 'Deadlift', sets: 3, reps: 8 },
      { id: '8', name: 'Leg Press', sets: 3, reps: 12 }
    ]
  },
  {
    id: '3',
    name: 'Full Body Workout',
    exercises: [
      { id: '1', name: 'Bench Press', sets: 3, reps: 10 },
      { id: '2', name: 'Squat', sets: 3, reps: 10 },
      { id: '3', name: 'Deadlift', sets: 3, reps: 8 },
      { id: '4', name: 'Pull-up', sets: 3, reps: 8 }
    ]
  }
]

type WorkoutPlan = {
  id: string
  name: string
  exercises: { id: string; name: string; sets: number; reps: number }[]
}

type StartFromPlanProps = {
  initialPlanId?: string | null
}

export function StartFromPlan({ initialPlanId = null }: StartFromPlanProps) {
  const navigation = useNavigate()
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlanId || '')
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null)

  useEffect(() => {
    if (selectedPlanId) {
      const plan = workoutPlans.find((p) => p.id === selectedPlanId)
      setSelectedPlan(plan || null)
    } else {
      setSelectedPlan(null)
    }
  }, [selectedPlanId])

  const handleStartWorkout = () => {
    if (selectedPlanId) {
      navigation(`/dashboard/active-workout?planId=${selectedPlanId}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="plan">Select Workout Plan</Label>
        <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
          <SelectTrigger id="plan">
            <SelectValue placeholder="Choose a workout plan" />
          </SelectTrigger>
          <SelectContent>
            {workoutPlans.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>
                {plan.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPlan && (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Exercises in this plan:</h3>
            <ul className="mt-2 space-y-2">
              {selectedPlan.exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {exercise.sets} sets × {exercise.reps} reps
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleStartWorkout} className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Start Workout
          </Button>
        </div>
      )}
    </div>
  )
}
