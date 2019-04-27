import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { useSpring, animated, config } from "react-spring"
import { TooltipPopoverWrapper, Props as TPWProps } from "../popper/TooltipPopoverWrapper"
import { generateClassNames } from "../_utils"

interface Props extends TPWProps{
  // className?: string,
  children?: any,
  // show?: boolean,
  // placement?: string,
  // placementPrefix?: 'bs-popover',
  // trigger?: string,
  // target?: any
  // toggle?: any
}

const defaultProps = {
  placement: 'right',
  placementPrefix: 'bs-popover',
  trigger: 'click'
}

export const Popover = (props: Props) => {
  const { className, innerClassName, ...rest } = props

  const classes = generateClassNames(['popover-inner', innerClassName])
  // const sProps = useSpring({
  //   immediate: show && !mounted,
  //   config: config.gentle,
  //   from: { height: show ? 0 : 'auto', opacity: 0, transform: 'translate3d(0,-20px,0)' },
  //   to: {
  //     height: show ? 'auto' : 0,
  //     opacity: show ? 1 : 0,
  //     transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,-20px,0)'
  //   },
  // })

  // let classNames = ['collapse', className, mounted ? 'show' : undefined]

  return (
    <TooltipPopoverWrapper popperClassName="popover show" innerClassName={classes} {...rest} />
    // <animated.div>
      // {children}
    // </animated.div>
  )
}

Popover.defaultProps = {
  placement: 'right',
  placementPrefix: 'bs-popover',
  trigger: 'click'
}