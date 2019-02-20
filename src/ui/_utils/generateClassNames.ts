export function generateClassNames(items: (string | undefined)[]): string {
  return items.filter(Boolean).join(' ')
}