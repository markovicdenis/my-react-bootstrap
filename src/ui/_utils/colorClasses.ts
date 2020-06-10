export type colorClasses = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'none'

const mapping: any = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
  link: 'link',
  none: ''
}

export function getColorClass(type: string, prefix: string = '', suffix: string = ''): string {
  const nType = mapping[type]
  const nPrefix = prefix ? prefix + '-' : ''
  const nSuffix = suffix ? '-' + suffix : ''
  if (!nType || nType.length < 1) return ''

  return `${nPrefix}${nType}${nSuffix}`
}