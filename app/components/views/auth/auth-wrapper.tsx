import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

type AuthVariant = 'login' | 'register'

export function AuthWrapper({
  variant,
  children,
  className,
  ...props
}: {
  variant: AuthVariant
  children: React.ReactNode
  className?: string
  props?: React.ComponentProps<'form'>
}) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <AuthTitle variant={variant} />
      {children}
      <AuthFooter variant={variant} />
    </form>
  )
}

function AuthTitle({ variant }: { variant: AuthVariant }) {
  const texts = {
    login: {
      title: 'Login to your account',
      description: 'Enter your email below to login to your account'
    },
    register: {
      title: 'Create an account',
      description: 'Enter your details below to create your account'
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">{texts[variant].title}</h1>
      <p className="text-muted-foreground text-balance text-sm">
        {texts[variant].description}
      </p>
    </div>
  )
}

function AuthFooter({ variant }: { variant: AuthVariant }) {
  const texts = {
    login: {
      button: 'Login',
      title: "Don't have an account?",
      description: 'Sign up'
    },
    register: {
      button: 'Login',
      title: 'Already have an account?',
      description: 'Sign in'
    },
    common: {
      button: 'Sign up with Google',
      title: 'Or continue with'
    }
  }

  return (
    <>
      <Button type="submit" className="w-full">
        {texts[variant].button}
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          {texts['common'].title}
        </span>
      </div>
      <Button variant="outline" className="w-full">
        {texts['common'].button}
      </Button>
      <div className="text-center text-sm">
        {texts[variant].title}{' '}
        <Link
          to={variant === 'login' ? '/register' : '/login'}
          className="underline underline-offset-4"
        >
          {texts[variant].description}
        </Link>
      </div>
    </>
  )
}
