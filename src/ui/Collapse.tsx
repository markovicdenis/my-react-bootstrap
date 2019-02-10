import React, { Component, createRef } from "react"
import { _$ } from "./_utils"
import { Spring, config, animated } from "react-spring/renderprops.cjs"

interface Props {
	className?: string,
	children?: any,
	show?: boolean
}

interface State {
	show?: boolean,
	className?: string,
	style?: any
}

export class Collapse extends Component<Props>{
	private element = createRef<HTMLDivElement>()
	private animate = false

	componentDidMount() {
		this.animate = true
		// const elem = _$(this.element.current)
	}

	// async componentDidUpdate(prevProps: Props) {
	// 	if (this.props.show !== prevProps.show) {
	// 		const elem = _$(this.element.current)
	// 		if (elem && this.props.show) {
	// 			elem.collapse('show')
	// 		} else if (elem) {
	// 			elem.collapse('hide')
	// 		}
	// 	}
	// }
	// let containerClassName = props.containerClassName || 'container'
	// let content = <div className={containerClassName}>{props.children}</div>
	// if (props.nocontainer) content = props.children
	render() {
		const {show, className, children} = this.props
		let classNames = ['collapse show', className]

		// if (show) classNames.push('show')

		return (
			<Spring
				native
				immediate={!this.animate}
				// config={config.stiff}
				config={{ tension: 2000, friction: 100, precision: 1 }}
				from={{ height: show ? 0 : 'auto', opacity: 0, transform: 'translate3d(0,20px,0)' }}
				to={{ 
					height: show ? 'auto' : 0, 
					opacity: show ? 1 : 0,
					transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)'
				}}
			>
				{(props) => (
					<animated.div ref={this.element} className={classNames.join(' ')} style={{...props }}>
						{children}
					</animated.div>

				)}
			</Spring>
		)
	}
}

