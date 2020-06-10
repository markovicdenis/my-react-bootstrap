import React, { useState, memo } from 'react'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses } from '../_utils/colorClasses'
import { useSpring, animated, config } from 'react-spring'

interface Props {
  onClick?: () => void
  children?: any
  center?: boolean
  className?: string
  addClass?: string
  visible?: boolean
  color?: colorClasses
}

export const Overlay = memo((props: Props) => {
  const { addClass, className, children, visible, center = true, ...rest } = props
  const [] = useState(visible)
  const { opacity }: any = useSpring({
    from: { opacity: 0 },
    to: { opacity: visible ? 1 : 0 },
    config: config.gentle
  })

  let classNames: any[] = ['overlay', addClass]

  if (center) classNames.push('overlay--center')

  return (
    <animated.div className={className || generateClassNames(classNames)} {...rest}
      style={{ opacity }}
    >
      {visible && children}
    </animated.div>
  )
})