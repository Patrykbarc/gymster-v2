import { useLoaderData } from 'react-router'
import type { Route } from '../+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Gymster | Dashboard' }]
}

export async function loader() {
  return {
    data: {
      message: 'Welcome to Gymster V2!',
      name: 'John Doe',
      age: 30
    }
  }
}

export default function Dashboard() {
  const { data } = useLoaderData<typeof loader>()
  return <div>{data.message}</div>
}
