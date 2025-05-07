import { cn } from '~/lib/utils'

export function SetsInputWrapper({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('space-y-2', className)}>{children}</div>
}
