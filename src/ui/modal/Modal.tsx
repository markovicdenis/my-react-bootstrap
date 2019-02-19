import React, { createRef, useRef, useState, useCallback } from 'react'
import { _$, isBrowser, delay } from '../_utils'
import { Spring, animated, config } from 'react-spring/renderprops.cjs'

interface Props {
	toggle?: (toggle: any) => any
	className?: string
	addClass?: string
	backdrop?: boolean
	fade?: boolean
	vcenter?: boolean
	show?: boolean
	children?: any
}

export function Modal(props: Props){
	const { addClass, className, vcenter, backdrop, show: originalShow, fade, toggle, children } = props
	const modal = useRef(null)
	const [show, setShow] = useState(originalShow)
	const [visible, setVisible] = useState(originalShow)

	let classNames = ['modal show', addClass]

	if (fade) classNames.push('fade')

	if (show) classNames.push('show')

	const toggleCallBack = useCallback( async () => {
		if (visible) {
			setShow(false)
			await delay(360)
			setVisible(false)
		} else {
			setVisible(true)
			setShow(true)
		}
	}, [visible, show])

	return (
		<>
			{toggle && toggle(toggleCallBack)}
			<div className={className || classNames.join(' ')} ref={modal} tabIndex={-1} role="dialog" aria-hidden={visible} style={{ display: visible ? 'block' : 'none', pointerEvents: 'none' }}>
				<div className={"modal-dialog" + (vcenter ? ' modal-dialog-centered' : '')} role="document">
					<div className="modal-content">
						{children}
					</div>
				</div>
			</div >
			{/* <Portal nodeId="modal">*/}
			{visible && <Spring
				force
				native
				config={{ ...config.default, precision: 0.1 }}
				// immediate={show}
				// config={{ tension: 200, friction: 100, precision: 1 }}
				from={{ opacity: 0 }}
				to={{
					// height: visible ? 'auto' : 0,
					opacity: show ? 0.4 : 0,
					// transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)',
				}}
			>
				{(styleProps) => (
					<animated.div className="modal-backdrop fade" style={{ ...styleProps }} onClick={toggleCallBack}>
					</animated.div>
				)}
			</Spring>
			} 
			{/* </Portal> */}
		</>
	)
}

// export default Modal