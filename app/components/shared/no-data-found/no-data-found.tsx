import { Link } from 'react-router'

export function NoDataFound({
  message,
  link
}: {
  message: string | React.ReactNode
  link?: {
    to: string
    text: string
  }
}) {
  return (
    <div className="mt-10 flex h-full items-center justify-center">
      <p className="text-muted-foreground text-sm">
        {message}{' '}
        {link && (
          <Link className="text-blue-500 hover:text-blue-600" to={link.to}>
            {link.text}
          </Link>
        )}
      </p>
    </div>
  )
}
