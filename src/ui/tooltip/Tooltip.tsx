import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { TooltipPopoverWrapper, Props as TPWProps } from '../popper/TooltipPopoverWrapper'
import { generateClassNames } from '../_utils'

export interface ITooltipProps extends TPWProps {
  toggleRender?: (props:{innerRef: any, toggle: any}) => any,
  children?: any,
}

export const Tooltip = (props: ITooltipProps) => {
  const [popoverOpen, setPopoverOpen] = useState(() => props.isOpen)
  const targetRef = useRef(null)
  const { className, innerClassName, popperClassName, toggleRender, toggle, isOpen, target, ...rest } = props

  const isNotContolled = Boolean(typeof toggle === 'undefined' && typeof isOpen === "undefined")
  const classes = generateClassNames([innerClassName])
 
  const onToggle = useCallback((e) => {
    if (toggleRender || isNotContolled) setPopoverOpen(!popoverOpen)
    else if (toggle) toggle(e)
  }, [popoverOpen])

  const innerRef = useCallback((ref) => {
    targetRef.current = ref
  }, [])

  if (toggleRender || isNotContolled) {
    return (
      <>
        {toggleRender && toggleRender({ innerRef, toggle: onToggle })}
        <TooltipPopoverWrapper popperClassName={popperClassName}
          innerClassName={classes}
          isOpen={popoverOpen}
          target={toggleRender ? targetRef: target}
          toggle={onToggle}
          {...rest} />
      </>
    )
  }

  return (
    <TooltipPopoverWrapper
      popperClassName={popperClassName}
      toggle={onToggle} 
      isOpen={isOpen} 
      target={target}
      innerClassName={classes}
      {...rest} />
  )
}


Tooltip.defaultProps = {
  popperClassName: 'tooltip show',
  innerClassName: 'tooltip-inner',
  placement: 'top',
  // autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'click hover focus'
}