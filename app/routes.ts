import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

const exerciseRoutes = [
  route('dashboard/exercises', './routes/(logged-in)/exercises/exercises.tsx'),
  route(
    'dashboard/exercises/new',
    './routes/(logged-in)/exercises/new-exercise.tsx'
  ),
  route(
    'dashboard/exercises/edit/:exerciseId',
    './routes/(logged-in)/exercises/edit-exercise.tsx'
  )
]
const workoutRoutes = [
  route('dashboard/workouts', './routes/(logged-in)/workout/workouts.tsx'),
  route(
    'dashboard/workouts/new',
    './routes/(logged-in)/workout/new-workout-plan.tsx'
  ),
  route(
    'dashboard/workouts/edit/:workoutId',
    './routes/(logged-in)/workout/edit-workout-plan.tsx'
  )
]

export default [
  index('routes/home.tsx'),

  layout('./routes/auth/layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('register', './routes/auth/register.tsx')
  ]),

  layout('./routes/(logged-in)/layout.tsx', [
    route('dashboard', './routes/(logged-in)/dashboard/dashboard.tsx'),
    ...exerciseRoutes,
    ...workoutRoutes,
    route(
      'dashboard/start-workout',
      './routes/(logged-in)/start-workout/start-workout.tsx'
    ),
    route(
      'dashboard/active-workout',
      './routes/(logged-in)/active-workout/active-workout.tsx'
    ),
    route('dashboard/history', './routes/(logged-in)/history/history.tsx')
  ])
] satisfies RouteConfig
