import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useAuthStore } from '~/store/authStore'
import { AuthWrapper } from './auth-wrapper'

type Schema = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
})

const inputs: {
  label: string
  name: keyof Schema
  type: string
  placeholder: string
}[] = [
  {
    label: 'Full Name',
    name: 'name',
    type: 'text',
    placeholder: 'John Doe'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'm@example.com'
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '********'
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: '********'
  }
]

export function RegisterForm({ ...props }: React.ComponentProps<'form'>) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: zodResolver(schema)
  })

  const { signUp, isLoading } = useAuthStore()

  async function onSubmit(data: Schema) {
    const response = await signUp(data.email, data.password, {
      firstName: data.name,
      email: data.email,
      password: data.password
    })

    console.log(response)
  }

  return (
    <AuthWrapper
      variant="register"
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="grid gap-6">
        {inputs.map((input) => (
          <div key={input.name} className="grid gap-3">
            <div className="space-y-1">
              <Label htmlFor={input.name}>{input.label}</Label>
              <Input
                id={input.name}
                type={input.type}
                placeholder={input.placeholder}
                required
                {...register(input.name)}
              />
              {errors[input.name] && (
                <p className="text-sm text-red-500">
                  {errors[input.name]?.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </AuthWrapper>
  )
}
