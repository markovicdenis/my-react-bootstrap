import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react"
import { useSpring, animated, config } from "react-spring"
import { TooltipPopoverWrapper, Props as TPWProps } from "../popper/TooltipPopoverWrapper"
import { generateClassNames } from "../_utils"

interface Props extends TPWProps {
  // className?: string,
  toggleRender?: any,
  children?: any,
  // show?: boolean,
  // placement?: string,
  // placementPrefix?: 'bs-popover',
  // trigger?: string,
  // target?: any
  // toggle?: any
}


export const Popover = (props: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(() => props.isOpen)
  const targetRef = useRef(null)
  const { className, innerClassName, toggleRender, toggle, isOpen, ...rest } = props

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

  const onToggle = useCallback((e) => {
    console.log('called', popoverOpen)
    if (toggleRender) setPopoverOpen(!popoverOpen)
    else if (toggle) toggle(e)
  }, [popoverOpen])

  const innerRef = useCallback((ref) => {
    console.log('inner Ref', ref)
    targetRef.current = ref
  }, [])

  // let classNames = ['collapse', className, mounted ? 'show' : undefined]
  if (toggleRender) {
    console.log('hey', popoverOpen)
    // return toggleElement({ toggle: onToggle })
    return (
      <>
        {toggleRender({ toggle: onToggle, innerRef })}
        <TooltipPopoverWrapper popperClassName="popover show"
          innerClassName={classes}
          isOpen={popoverOpen}
          target={targetRef}
          {...rest} />
      </>
    )
  }

  return (
    <TooltipPopoverWrapper popperClassName="popover show" toggle={onToggle} isOpen={isOpen} innerClassName={classes} {...rest} />
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