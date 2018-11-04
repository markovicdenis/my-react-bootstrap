import React, { PureComponent, CSSProperties } from 'react'

interface Props {
	onClick?: () => void
	className?: string
	addClass?: string
	style?: CSSProperties
	visible?: boolean
}

export class Divider extends PureComponent<Props>{
	static defaultProps = {
		onClick: () => { }
	}

	render() {
		let classNames: string[] = []
		let style: CSSProperties = {}
		if (this.props.addClass) classNames.push(this.props.addClass)
		if (!this.props.visible) style.borderColor = 'rgba(0,0,0,0)'
		if (this.props.style) style = { ...style, ...this.props.style }

		return (
			<hr className={this.props.className || classNames.filter(n => n).join(' ')}
				onClick={this.props.onClick}
				style={style}
			>
			</hr>
		)
	}
}