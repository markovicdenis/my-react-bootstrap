import React, { CSSProperties, HTMLAttributes } from 'react'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { getSizeClass } from '../_utils/sizeClasses'

interface Props extends HTMLAttributes<HTMLDivElement> {
  addClass?: string
  grow?: boolean
  visible?: boolean
  hasCloseButton?: boolean
  color?: colorClasses
  size?: 'small'
}

export const Spinner = (props: Props) => {
  const { addClass, grow, size, color, visible, ...rest } = props
  const mainClass = grow ? 'spinner-grow' : 'spinner-border'
  let classNames: any[] = [mainClass, addClass]

  if (size) classNames.push(getSizeClass(size, mainClass))

  if (color) classNames.push(getColorClass(color || 'secondary', 'text'))

  if (typeof visible === 'boolean' && !visible) return null

  return (
    <div className={props.className || generateClassNames(classNames)} role="status" {...rest}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface WProps extends Props{
  wrapperClass?: string
}

export const WrappedSpinner = (props: WProps) => {
  const { wrapperClass, ...rest } = props

  return (
    <div className={wrapperClass}>
      <Spinner {...rest} />
    </div>
  )
}