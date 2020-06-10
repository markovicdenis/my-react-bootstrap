export const _$ = (sel: any) => {
  //@ts-ignore
  if (typeof $ === 'undefined') return {}

  //@ts-ignore
  return $(sel)
}

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

export const delay = (timeout: number, resolveObject: any = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resolveObject)
    }, timeout)
  })
}

export function get(obj, prop, fallback?) {
  const arr = prop.split('.')

  try {
    while (arr.length && (obj = obj[arr.shift()]));
    if (!obj && typeof fallback !== 'undefined') return fallback

    return obj
  } catch (error) {
    return fallback
  }
}