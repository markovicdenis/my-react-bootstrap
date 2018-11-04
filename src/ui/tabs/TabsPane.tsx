import React, { PureComponent, CSSProperties } from 'react'
import { generateClassNames } from '../_utils'

interface Props {
	onClick?: () => void
	children?: any
	className?: string
	addClass?: string
	active?: boolean
	style?: CSSProperties
	fade?: boolean
}

export class TabsPane extends PureComponent<Props>{
	static defaultProps = {
		onClick: () => { },
	}

	render() {
		let classNames: any[] = ['tab-pane', this.props.addClass]
		if (this.props.active) classNames.push('show active')
		if (this.props.fade) classNames.push('fade')

		return (
			<div className={this.props.className || generateClassNames(classNames)}
				onClick={this.props.onClick}
				role="tabpanel"
				style={this.props.style}
			>
				{this.props.children}
			</div>
		)
	}
}
