import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { useAuthStateChange } from './hooks/useAuthStateChange'
import { authService } from './services/api/auth/authService'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
  }
]

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const publicUrls = ['/login', '/register']

  const {
    session: { user_id }
  } = await authService.getUser(request)

  if (url.pathname === '/') {
    return redirect('/login')
  }

  if (user_id && publicUrls.includes(url.pathname)) {
    return redirect('/dashboard')
  }

  if (publicUrls.includes(url.pathname)) {
    return { user: null }
  }

  if (!user_id) {
    return redirect('/login')
  }

  return { user_id }
}

export function Layout({ children }: { children: React.ReactNode }) {
  useLoaderData<typeof loader>()
  useAuthStateChange()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Gymster</title>
      </head>
      <body className="overflow-x-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
