export const _$ = (sel: any) => {
	//@ts-ignore
	if (typeof $ === 'undefined') return {}
	//@ts-ignore
	return $(sel)
}

export const isBrowser = () : boolean => {
	return typeof window !== 'undefined'
}

export const delay = (timeout: number, resolveObject:any='') => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(resolveObject)
		}, timeout)
	})
}
