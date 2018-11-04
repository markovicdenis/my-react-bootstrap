import React, { Component, createRef } from 'react'
import { _$, isBrowser } from '../_utils'

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
			show: props.show
		}
	}

	init = () => {
		if (this.modal && this.modal.current) {
			this.modalElement = _$(this.modal.current)
			this.modalElement.modal({
				backdrop: this.props.backdrop,
				show: this.props.show
			})
			this.modalElement.on('hide.bs.modal', () => {
				this.setState({ show: false })
			})
		}
	}

	componentDidMount() {
		if (isBrowser && !this.modal || !this.modalElement) this.init()
	}

	componentWillUnmount() {
		if (this.modal) this.modalElement.off('hide.bs.modal')
	}

	toggle = () => {
		if (this.state.show) {
			this.modalElement.modal('hide')
		} else {
			this.modalElement.modal('show')
		}
		this.setState({ show: !this.state.show })
	}

	render() {
		let classNames = ['modal', this.props.addClass]

		if (this.props.fade) classNames.push('fade')

		return (
			<>
				{this.props.toggle && this.props.toggle(this.toggle)}
				{/* <Portal nodeId="modal"> */}
					<div className={this.props.className || classNames.join(' ')} ref={this.modal} tabIndex={-1} role="dialog" aria-hidden="true">
						<div className={"modal-dialog" + (this.props.vcenter ? ' modal-dialog-centered' : '')} role="document">
							<div className="modal-content">
								{this.props.children}
							</div>
						</div>
					</div >
				{/* </Portal> */}
			</>
		)
	}
}