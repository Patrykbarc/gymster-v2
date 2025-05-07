export const workoutHistory = [
  {
    id: '1',
    name: 'Upper Body Split',
    date: new Date(2023, 3, 28),
    duration: 45 * 60, // in seconds
    exerciseCount: 6,
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { reps: 10, weight: 135, completed: true },
          { reps: 10, weight: 135, completed: true },
          { reps: 8, weight: 135, completed: true }
        ]
      },
      {
        name: 'Shoulder Press',
        sets: [
          { reps: 10, weight: 95, completed: true },
          { reps: 8, weight: 95, completed: true },
          { reps: 8, weight: 95, completed: true }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Leg Day',
    date: new Date(2023, 3, 26),
    duration: 60 * 60, // in seconds
    exerciseCount: 5,
    exercises: [
      {
        name: 'Squat',
        sets: [
          { reps: 8, weight: 185, completed: true },
          { reps: 8, weight: 185, completed: true },
          { reps: 6, weight: 185, completed: true }
        ]
      },
      {
        name: 'Deadlift',
        sets: [
          { reps: 8, weight: 225, completed: true },
          { reps: 6, weight: 225, completed: true },
          { reps: 6, weight: 225, completed: true }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Full Body',
    date: new Date(2023, 3, 24),
    duration: 75 * 60, // in seconds
    exerciseCount: 8,
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { reps: 10, weight: 135, completed: true },
          { reps: 10, weight: 135, completed: true },
          { reps: 8, weight: 135, completed: true }
        ]
      },
      {
        name: 'Squat',
        sets: [
          { reps: 8, weight: 185, completed: true },
          { reps: 8, weight: 185, completed: true },
          { reps: 6, weight: 185, completed: true }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Core Focus',
    date: new Date(2023, 3, 22),
    duration: 30 * 60, // in seconds
    exerciseCount: 4,
    exercises: [
      {
        name: 'Plank',
        sets: [
          { reps: 60, weight: 0, completed: true }, // seconds
          { reps: 45, weight: 0, completed: true }, // seconds
          { reps: 30, weight: 0, completed: true } // seconds
        ]
      },
      {
        name: 'Crunches',
        sets: [
          { reps: 15, weight: 0, completed: true },
          { reps: 15, weight: 0, completed: true },
          { reps: 15, weight: 0, completed: true }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Upper Body',
    date: new Date(2023, 3, 20),
    duration: 50 * 60, // in seconds
    exerciseCount: 6,
    exercises: [
      {
        name: 'Pull-ups',
        sets: [
          { reps: 8, weight: 0, completed: true },
          { reps: 6, weight: 0, completed: true },
          { reps: 6, weight: 0, completed: true }
        ]
      },
      {
        name: 'Bicep Curls',
        sets: [
          { reps: 12, weight: 30, completed: true },
          { reps: 10, weight: 30, completed: true },
          { reps: 10, weight: 30, completed: true }
        ]
      }
    ]
  }
]
