import React, { CSSProperties } from 'react'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { getSizeClass } from '../_utils/sizeClasses'

interface Props {
  onClick?: () => void
  children?: any
  className?: string
  addClass?: string
  grow?: boolean
  visible?: boolean
  hasCloseButton?: boolean
  color?: colorClasses
  size?: 'small'
  style?: CSSProperties

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