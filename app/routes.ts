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

  layout('./routes/home/layout.tsx', [
    route('app', './routes/home/home.tsx', [
      // route('exercises', './routes/dashboard/exercises.tsx'),
      // route('plans', './routes/dashboard/plans.tsx'),
      // route('workout', './routes/dashboard/workout.tsx'),
      // route('history', './routes/dashboard/history.tsx')
    ])
  ])
] satisfies RouteConfig
