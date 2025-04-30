import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Gymster' },
    { name: 'description', content: 'Welcome to Gymster!' }
  ]
}

export default function Home() {
  return <div>Home</div>
}
