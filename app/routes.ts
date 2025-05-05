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

  layout('./routes/dashboard/layout.tsx', [
    route('dashboard', './routes/dashboard/dashboard.tsx'),
    route('dashboard/exercises', './routes/dashboard/exercises.tsx'),
    route('dashboard/workout-plans', './routes/workout/workout-plans.tsx'),
    route(
      'dashboard/workout-plans/new',
      './routes/workout/new-workout-plan.tsx'
    )
    // route('dashboard/workout', './routes/dashboard/workout.tsx'),
    // route('dashboard/history', './routes/dashboard/history.tsx')
  ])
] satisfies RouteConfig
