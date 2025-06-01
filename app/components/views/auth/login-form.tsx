import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useAuthStore } from '~/store/authStore'
import { AuthWrapper } from './auth-wrapper'

type Schema = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
})

export function LoginForm({ ...props }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  })
  const { signInWithPassword: signInWithEmail, isLoading } = useAuthStore()

  async function onSubmit(data: Schema) {
    await signInWithEmail(data.email, data.password)
  }

  return (
    <AuthWrapper variant="login" onSubmit={handleSubmit(onSubmit)} {...props}>
      <fieldset disabled={isLoading}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              tabIndex={1}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <ForgotPassword />
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              tabIndex={2}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
      </fieldset>
    </AuthWrapper>
  )
}

function ForgotPassword() {
  return (
    <div className="flex items-center">
      <Label htmlFor="password">Password</Label>
      <a
        href="#"
        className="ml-auto text-sm underline-offset-4 hover:underline"
      >
        Forgot your password?
      </a>
    </div>
  )
}
