import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { AuthWrapper } from './auth-wrapper'

export function RegisterForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <AuthWrapper variant="register" {...props}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" required />
        </div>
      </div>
    </AuthWrapper>
  )
}
