export type sizeClasses = 'small' | 'large' | 'xl'

const mapping :any= {
  xl: 'xl',
  small: 'sm',
  large: 'lg',
  none: ''
}

export function getSizeClass(type:string, prefix:string='', suffix:string=''):string{
  const nType = mapping[type]
  const nPrefix = prefix ? prefix + '-' : ''
  const nSuffix = suffix ? '-' + suffix : ''
  if(!nType || nType.length < 1) return ''
  return `${nPrefix}${nType}${nSuffix}`
}