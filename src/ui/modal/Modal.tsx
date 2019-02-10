import React, { Component, createRef } from 'react'
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
}

interface State {
	visible?: boolean
	show?: boolean
}

export class Modal extends Component<Props, State>{
	private modal = createRef<HTMLDivElement>()
	private modalElement: any

	static defaultProps = {
		backdrop: true,
		show: false,
		fade: true
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			show: props.show,
			visible: props.show
		}
	}

	// init = () => {
	// 	if (this.modal && this.modal.current) {
	// 		this.modalElement = _$(this.modal.current)
	// 		this.modalElement.modal({
	// 			backdrop: this.props.backdrop,
	// 			show: this.props.show
	// 		})
	// 		this.modalElement.on('hide.bs.modal', () => {
	// 			this.setState({ show: false })
	// 		})
	// 	}
	// }

	componentDidMount() {
		// if (isBrowser && !this.modal || !this.modalElement) this.init()
	}

	componentWillUnmount() {
		// if (this.modal) this.modalElement.off('hide.bs.modal')
	}

	toggle = async () => {
		console.log('omg')
		// if (this.state.show) {
		// 	this.modalElement.modal('hide')
		// } else {
		// 	this.modalElement.modal('show')
		// }
		if (this.state.visible) {
			this.setState({ show: false })
			await delay(360)
			this.setState({ visible: false })
		} else {
			this.setState({ show: true, visible: true })
		}
	}

	render() {
		const { addClass, fade, className, vcenter, toggle, children } = this.props
		const { visible, show } = this.state
		let classNames = ['modal show', this.props.addClass]

		if (fade) classNames.push('fade')

		if (show) classNames.push('show')

		return (
			<>
				{toggle && toggle(this.toggle)}
				<div className={className || classNames.join(' ')} ref={this.modal} tabIndex={-1} role="dialog" aria-hidden={visible} style={{ display: visible ? 'block' : 'none', pointerEvents: 'none' }}>
					<div className={"modal-dialog" + (vcenter ? ' modal-dialog-centered' : '')} role="document">
						<div className="modal-content">
							{children}
						</div>
					</div>
				</div >
				{/* <Portal nodeId="modal"> */}
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
						<animated.div className="modal-backdrop fade" style={{ ...styleProps }} onClick={this.toggle}>
						</animated.div>
					)}
				</Spring>
				}
				{/* </Portal> */}
			</>
		)
	}
}