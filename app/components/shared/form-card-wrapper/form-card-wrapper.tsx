import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'

type FormCardWrapperProps = {
  children: React.ReactNode
  title: string
  description: string
}

export function FormCardWrapper({
  children,
  title,
  description
}: FormCardWrapperProps) {
  return (
    <div className="max-w-5xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
