import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useLoaderData, useRevalidator } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'
import type { loader } from '~/routes/(logged-in)/workout/edit-workout-plan'
import { exercisesService } from '~/services/api/exercises/exercisesService'
import { useAuthStore } from '~/store/authStore'
import type {
  Field,
  Value,
  WorkoutExerciseWithSets
} from '~/types/workouts.types'

type ExerciseSelectProps = {
  exercise: WorkoutExerciseWithSets
  handleChange: (field: Field, value: Value) => void
}

export function ExerciseSelect({
  exercise,
  handleChange
}: ExerciseSelectProps) {
  const revalidate = useRevalidator()
  const { user } = useAuthStore()
  const { exercises } = useLoaderData<typeof loader>()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const hasExercises = exercises && exercises.length > 0

  const exercisesById = useMemo(() => {
    if (!exercises) return {}
    return exercises.reduce(
      (acc, ex) => {
        acc[ex.id] = ex
        return acc
      },
      {} as Record<string, (typeof exercises)[number]>
    )
  }, [exercises])

  async function handleAddNewExercise() {
    setOpen(false)

    const promise = exercisesService.insertExercise({
      name: search,
      difficulty: 'beginner',
      user_id: user?.id || ''
    })

    try {
      const newExercise = await toast.promise(promise, {
        loading: 'Adding exercise...',
        success: 'Exercise added successfully',
        error: 'Failed to add exercise'
      })

      if (newExercise && newExercise.length > 0) {
        revalidate.revalidate()
        handleChange('exercise_id', newExercise?.[0]?.id || '')
      }
    } catch (error) {
      console.error(error)
    }

    setSearch('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between truncate"
        >
          {exercise.exercise_id
            ? exercises?.find((ex) => ex.id === exercise.exercise_id)?.name
            : hasExercises
              ? 'Select exercise...'
              : 'Add your first exercise'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[300px] p-0" align="start">
        <Command
          filter={(value, search) => {
            const name = exercisesById[value]?.name
            if (name?.toLowerCase().includes(search.toLowerCase())) {
              return 1
            }
            return 0
          }}
        >
          <CommandInput
            searchIcon={hasExercises}
            placeholder={
              hasExercises ? 'Search exercise...' : 'Name your exercise'
            }
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {search.trim().length > 0 && (
              <CommandEmpty
                className="hover:bg-accent flex cursor-pointer items-center truncate p-2 text-sm transition-colors"
                onClick={handleAddNewExercise}
              >
                <PlusIcon className="mr-1 size-4" /> Add {search}
              </CommandEmpty>
            )}

            {hasExercises && (
              <CommandGroup>
                {exercises?.map((ex) => (
                  <CommandItem
                    key={ex.id}
                    value={ex.id}
                    onSelect={(currentValue) => {
                      const newValue =
                        currentValue === exercise.exercise_id
                          ? ''
                          : currentValue
                      handleChange('exercise_id', newValue)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 size-4',
                        exercise.exercise_id === ex.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {ex.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
