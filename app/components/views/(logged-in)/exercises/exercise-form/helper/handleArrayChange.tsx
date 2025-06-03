export function handleArrayChange(value: string | null) {
  return (
    value
      ?.split(',')
      .map((item: string) => item.trim())
      .filter(Boolean) || null
  )
}
