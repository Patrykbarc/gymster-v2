import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { AuthWrapper } from './auth-wrapper'

export function LoginForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <AuthWrapper variant="login" {...props}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </AuthWrapper>
  )
}
