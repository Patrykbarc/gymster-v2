import type { FieldErrors } from 'react-hook-form'

export function ExercisesErrors({ errors }: { errors: FieldErrors }) {
  return (
    errors.exercises && (
      <div className="space-y-2">
        {Array.isArray(errors.exercises) &&
          errors.exercises.map((exerciseError, exerciseIndex) => (
            <div key={exerciseIndex} className="space-y-1">
              {exerciseError?.message && (
                <p className="text-sm text-red-500">
                  Exercise {exerciseIndex + 1}: {exerciseError.message}
                </p>
              )}

              {exerciseError?.exercise_sets &&
                Array.isArray(exerciseError.exercise_sets) &&
                exerciseError.exercise_sets.map(
                  (setError: any, setIndex: number) => (
                    <div key={setIndex} className="ml-4">
                      {setError?.reps?.message && (
                        <p className="text-sm text-red-500">
                          Exercise {exerciseIndex + 1}, Set {setIndex + 1} -
                          Reps: {setError.reps.message}
                        </p>
                      )}
                      {setError?.weight?.message && (
                        <p className="text-sm text-red-500">
                          Exercise {exerciseIndex + 1}, Set {setIndex + 1} -
                          Weight: {setError.weight.message}
                        </p>
                      )}
                      {setError?.notes?.message && (
                        <p className="text-sm text-red-500">
                          Exercise {exerciseIndex + 1}, Set {setIndex + 1} -
                          Notes: {setError.notes.message}
                        </p>
                      )}
                      {setError?.order_position?.message && (
                        <p className="text-sm text-red-500">
                          Exercise {exerciseIndex + 1}, Set {setIndex + 1} -
                          Order: {setError.order_position.message}
                        </p>
                      )}
                    </div>
                  )
                )}
            </div>
          ))}
      </div>
    )
  )
}
