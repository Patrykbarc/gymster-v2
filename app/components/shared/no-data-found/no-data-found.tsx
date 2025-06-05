import { Link } from 'react-router'

export function NoDataFound({
  message,
  link,
  linkText
}: {
  message: string
  link: string
  linkText: string
}) {
  return (
    <div className="mt-10 flex h-full items-center justify-center">
      <p className="text-muted-foreground text-sm">
        {message}{' '}
        <Link className="text-blue-500 hover:text-blue-600" to={link}>
          {linkText}
        </Link>
      </p>
    </div>
  )
}
