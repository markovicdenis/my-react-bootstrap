import React, { useRef, useState, useCallback, memo, useEffect, forwardRef, useImperativeHandle } from 'react'
import { _$, delay, generateClassNames } from '../_utils'
import { useSpring, animated } from 'react-spring'
import { Portal } from '../portal/Portal';
import { sizeClasses, getSizeClass } from '../_utils/sizeClasses';

interface Props {
  toggle?: (toggle: any) => any
  ref?: any
  className?: string
  addClass?: string
  backdrop?: boolean
  fade?: boolean
  vcenter?: boolean
  show?: boolean
  children?: any
  size?: sizeClasses
}

export const Modal = forwardRef<{toggle: ()=>any}, Props>((props: Props, ref) => {
  const { addClass, className, vcenter, show: originalShow, fade, toggle, size, children } = props
  const modal = useRef(null)
  const [show, setShow] = useState(originalShow)
  const [visible, setVisible] = useState(originalShow)
  const { opacityLess, opacity, transform }: any = useSpring({
    from: { opacityLess: 0, opacity: 0, transform: 'translate3d(0,20px,0)' },
    to: { opacityLess: show ? 0.5 : 0, opacity: show ? 1 : 0, transform: `translate3d(0,${show ? 0 : 20}px,0)` },
    config: { mass: 5, tension: 350, friction: 40 }
  })

  let classNames = ['modal s', addClass]
  if (fade) classNames.push('fade')
  if (show) classNames.push('show')

  let dialogClassNames = ['modal-dialog']
  if (vcenter) dialogClassNames.push('modal-dialog-centered')
  if (size) dialogClassNames.push(getSizeClass(size, 'modal'))

  const handleToggle = useCallback(async () => {
    if (visible) {
      setShow(false)
      await delay(360)
      setVisible(false)
    } else {
      setVisible(true)
      await delay(0)
      setShow(true)
    }
  }, [visible, show])

  useImperativeHandle(ref, () => {
    return {
      toggle: handleToggle
    }
  })

  return (
    <>
      {toggle && toggle(handleToggle)}
      <Portal>
        <div className={className || generateClassNames(classNames)} ref={modal} tabIndex={-1} role="dialog" aria-hidden={visible} style={{ display: visible ? 'block' : 'none', pointerEvents: 'none' }}>
          <animated.div className={generateClassNames(dialogClassNames)}
            role="document" style={{ opacity, transform }}
          >
            <div className="modal-content">
              {children}
            </div>
          </animated.div>
        </div >
        {visible &&
          <animated.div className="modal-backdrop fade" style={{ opacity: opacityLess }} onClick={handleToggle}>
          </animated.div>
        }
      </Portal>
    </>
  )
})