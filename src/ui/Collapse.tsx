import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { _$ } from "./_utils"
import { useSpring, animated, config } from "react-spring"
import { useIsMounted } from "../hooks/useIsMounted"

interface Props {
  className?: string,
  children?: any,
  show?: boolean
}

export const Collapse = (props: Props) => {
  const mounted = useIsMounted()
  const { show, className, children } = props

  const sProps = useSpring({
    immediate: show && !mounted,
    config: config.gentle,
    from: { height: show ? 0 : 'auto', opacity: 0, transform: 'translate3d(0,-20px,0)' },
    to: {
      height: show ? 'auto' : 0,
      opacity: show ? 1 : 0,
      transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,-20px,0)'
    },
  })

  let classNames = ['collapse', className, mounted ? 'show' : undefined]

  return (
    <animated.div className={classNames.join(' ')} style={{ ...sProps }}>
      {children}
    </animated.div>
  )
}

