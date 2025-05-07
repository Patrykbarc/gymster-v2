import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),

  layout('./routes/auth/layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('register', './routes/auth/register.tsx')
  ]),

  layout('./routes/(logged-in)/layout.tsx', [
    route('dashboard', './routes/(logged-in)/dashboard/dashboard.tsx'),
    route(
      'dashboard/exercises',
      './routes/(logged-in)/exercises/exercises.tsx'
    ),
    route(
      'dashboard/workout-plans',
      './routes/(logged-in)/workout/workout-plans.tsx'
    ),
    route(
      'dashboard/workout-plans/new',
      './routes/(logged-in)/workout/new-workout-plan.tsx'
    ),
    route(
      'dashboard/start-workout',
      './routes/(logged-in)/start-workout/start-workout.tsx'
    ),
    route(
      'dashboard/active-workout',
      './routes/(logged-in)/active-workout/active-workout.tsx'
    )
    // route('dashboard/history', './routes/dashboard/history.tsx')
  ])
] satisfies RouteConfig
