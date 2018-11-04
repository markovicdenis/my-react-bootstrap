export function generateClassNames(items:string[]):string{
	return items.filter(Boolean).join(' ')
}