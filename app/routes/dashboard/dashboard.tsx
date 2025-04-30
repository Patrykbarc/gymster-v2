import { useLoaderData } from 'react-router'

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
