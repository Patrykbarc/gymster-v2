'use client'

import { format } from 'date-fns'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import ActiveExercise from '~/components/views/(logged-in)/active-workout/active-exercise'

type ExerciseSet = {
  reps: number
  weight: number
  completed: boolean
}

type Exercise = {
  id: string
  name: string
  completed: boolean
  sets: ExerciseSet[]
}

type WorkoutPlan = {
  id: string
  name: string
  exercises: { id: string; name: string; sets: number; reps: number }[]
}

const workoutPlans: Record<string, WorkoutPlan> = {
  '1': {
    id: '1',
    name: 'Upper Body Split',
    exercises: [
      { id: '1', name: 'Bench Press', sets: 3, reps: 10 },
      { id: '5', name: 'Shoulder Press', sets: 3, reps: 10 },
      { id: '6', name: 'Bicep Curl', sets: 3, reps: 12 },
      { id: '7', name: 'Tricep Extension', sets: 3, reps: 12 }
    ]
  },
  '2': {
    id: '2',
    name: 'Lower Body Split',
    exercises: [
      { id: '2', name: 'Squat', sets: 4, reps: 8 },
      { id: '3', name: 'Deadlift', sets: 3, reps: 8 },
      { id: '8', name: 'Leg Press', sets: 3, reps: 12 }
    ]
  }
}

export default function ActiveWorkoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('planId')
  const isCustom = searchParams.get('custom') === 'true'

  const [startTime] = useState(new Date())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [workoutName, setWorkoutName] = useState(
    isCustom ? 'Custom Workout' : ''
  )
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

  useEffect(() => {
    if (planId && workoutPlans[planId as keyof typeof workoutPlans]) {
      const plan = workoutPlans[planId as keyof typeof workoutPlans]
      setWorkoutName(plan.name)
      setExercises(
        plan.exercises.map((ex) => ({
          ...ex,
          completed: false,
          sets: Array(ex.sets)
            .fill(null)
            .map(() => ({
              reps: ex.reps,
              weight: 0,
              completed: false
            }))
        }))
      )
    } else if (isCustom) {
      setExercises([
        {
          id: '1',
          name: 'Bench Press',
          completed: false,
          sets: Array(3)
            .fill(null)
            .map(() => ({ reps: 10, weight: 0, completed: false }))
        },
        {
          id: '4',
          name: 'Pull-up',
          completed: false,
          sets: Array(3)
            .fill(null)
            .map(() => ({ reps: 8, weight: 0, completed: false }))
        }
      ])
    } else {
      // TODO: Redirect to start workout page
      //   navigate('/start-workout')
    }
  }, [planId, isCustom, navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(
        Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSetComplete = (
    exerciseIndex: number,
    setIndex: number,
    completed: boolean,
    weight: number,
    reps: number
  ) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      completed,
      weight,
      reps
    }

    const allSetsCompleted = updatedExercises[exerciseIndex].sets.every(
      (set) => set.completed
    )
    updatedExercises[exerciseIndex].completed = allSetsCompleted

    setExercises(updatedExercises)

    if (allSetsCompleted && exerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(exerciseIndex + 1)
    }
  }

  const handleFinishWorkout = () => {
    const workoutData = {
      name: workoutName,
      date: startTime,
      duration: elapsedTime,
      exercises: exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets.map((set) => ({
          reps: set.reps,
          weight: set.weight,
          completed: set.completed
        }))
      }))
    }

    console.log('Finished workout:', workoutData)
    navigate('/history')
  }

  const allExercisesCompleted =
    exercises.length > 0 && exercises.every((ex) => ex.completed)

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{workoutName}</h1>
          <p className="text-muted-foreground">
            {format(startTime, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-lg">
          <Clock className="h-5 w-5" />
          {formatTime(elapsedTime)}
        </div>
      </div>

      <div className="space-y-6">
        {exercises.map((exercise, index) => (
          <Card
            key={exercise.id}
            className={index === currentExerciseIndex ? 'border-primary' : ''}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                {exercise.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="border-muted-foreground h-5 w-5 rounded-full border-2" />
                )}
                {exercise.name}
              </CardTitle>
              <div className="text-muted-foreground text-sm">
                {exercise.sets.filter((set) => set.completed).length} /{' '}
                {exercise.sets.length} sets
              </div>
            </CardHeader>
            <CardContent>
              <ActiveExercise
                exercise={exercise}
                exerciseIndex={index}
                onSetComplete={handleSetComplete}
                isActive={index === currentExerciseIndex}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Workout Notes (Optional)</Label>
            <Input id="notes" placeholder="Add notes about this workout..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/start-workout')}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Workout
          </Button>
          <Button
            onClick={handleFinishWorkout}
            disabled={!allExercisesCompleted}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Finish Workout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
