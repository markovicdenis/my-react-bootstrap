import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops.cjs'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses, getColorClass } from '../_utils/colorClasses'

interface Props {
	onClick?: () => void
	children?: any
	center?: boolean
	className?: string
	addClass?: string
	visible?: boolean
	color?: colorClasses
}

interface State {
	show?: boolean
}

export class Overlay extends Component<Props, State>{
	static defaultProps = {
		onClick: () => { }
	}

	constructor(props: Props){
		super(props)
		this.state = {
			show: props.visible
		}
	}

	render() {
		const { addClass, children, visible, center, ...rest } = this.props
		let classNames: any[] = ['overlay', addClass]

		// if (this.props.status) classNames.push(getColorClass(colorLookup[this.props.status], 'alert'))
		// else if (this.props.color) classNames.push(getColorClass(this.props.color || 'secondary', 'alert'))

		// if (this.state.fade) classNames.push('fade')
		if(center) classNames.push('overlay--center')

		return (
			<Spring
				from={{ opacity: 0 }}
				config={{ tension: 2000, friction: 100, precision: 1 }}
				to={{ opacity: visible ? 1 : 0 }}
			>
				{(props: any) => (
					<div className={this.props.className || generateClassNames(classNames)} {...rest}
						style={{...props, zIndex: visible ? 1 : -1 }}
					>
						{visible && children}
					</div>
				)}
			</Spring>
		)
	}
}