export const _$ = (sel: any) => {
	if (typeof $ === 'undefined') return {}
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
