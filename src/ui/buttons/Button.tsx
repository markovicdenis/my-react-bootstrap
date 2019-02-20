import React, { memo, useState, useEffect } from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../_utils/sizeClasses'
import { Spinner } from '../spinner/Spinner'
import { useSpring, animated, config } from 'react-spring'
import { useIsMounted } from '../../effects/useIsMounted'

export interface ButtonProps {
  tag?: 'button' | 'a' | string
  children?: any
  block?: boolean
  loading?: boolean
  className?: string
  addClass?: string
  circle?: boolean
  outline?: boolean
  onClick?: (e: any) => void
  color?: colorClasses
  size?: sizeClasses
  [key: string]: any
}

export const Button = memo((props: ButtonProps) => {
  const mounted = useIsMounted()
  const { tag = 'button', addClass, block, circle, outline, color, className, children, loading, setRef, size, ...rest } = props
  const { width, opacity }: any = useSpring({
    immediate: loading && !mounted,
    from: { width: 0, opacity: 0 },
    to: { width: loading ? 21 : 0, opacity: loading ? 1 : 0 },
    config: config.gentle
  })
  let Tag: any = tag
  let classNames: any[] = ['btn', addClass]
  if (circle) classNames.push('btn-circle')

  if (outline) classNames.push(getColorClass(color || 'secondary', 'btn-outline'))
  else classNames.push(getColorClass(color || 'secondary', 'btn'))

  if (size) classNames.push(getSizeClass(size, 'btn'))

  if (block) classNames.push('btn-block')

  return (
    <Tag className={className || generateClassNames(classNames)} {...rest} ref={setRef}>
      {children}

      <animated.div style={{ pointerEvents: 'none', display: 'inline-block', textAlign: 'right', opacity, width }}>
        {loading && <Spinner grow size="small" />}
      </animated.div>
    </Tag>
  )
})