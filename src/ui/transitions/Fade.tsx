import React, { HTMLAttributes, useState } from 'react'
import PropTypes from 'prop-types'
import { mapToCssModules, omit, pick, TransitionPropTypeKeys, TransitionTimeouts, tagPropType } from '../_utils/utils'
import { generateClassNames, delay } from '../_utils'
import { useSpring, config, animated } from 'react-spring';

interface Props extends HTMLAttributes<any> {
  tag: string
  baseClass: string
  baseClassActive: string
  className: string
  cssModule: any
  in: boolean
  placement: string
  timeout: any
  onExited: any
  innerRef: any
}

// const defaultProps = {
//   ...Transition.defaultProps,
//   tag: 'div',
//   baseClass: 'fade',
//   baseClassActive: 'show',
//   timeout: TransitionTimeouts.Fade,
//   appear: true,
//   enter: true,
//   exit: true,
//   in: true,
// };

export const Fade = (props: Props) => {
  const {
    tag = "div",
    baseClass = "fades",
    baseClassActive,
    className,
    children,
    innerRef,
    in: isActive,
    placement = "bottom",
    timeout: any,
    onExited,
    ...rest
  } = props

  const Tag: any = tag
  const classes = generateClassNames([className, baseClass])
  
  const { opacity, display }: any = useSpring({
    immediate: true,
    from: { opacity: 0 },
    to:  async (next, cancel) => {
      await delay(100)
      await next({opacity: isActive ? 1 : 0})
      if(!isActive && props.onExited ) props.onExited()
    },
    config: config.gentle,
  })

  // const transitionProps = pick(otherProps, TransitionPropTypeKeys)
  // const childProps = omit(otherProps, TransitionPropTypeKeys)
  return (
    <animated.div style={{ opacity }}>
      <Tag className={classes} {...rest} ref={innerRef}>
        {children}
      </Tag>
    </animated.div>
  )
}


Fade.defaultProps = {
  tag: 'div',
  onExited: () => { },
  in: false
}
// Fade.propTypes = propTypes
// Fade.defaultProps = defaultProps

// export default Fade