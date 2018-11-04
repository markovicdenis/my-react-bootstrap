import React, { PureComponent } from 'react'

interface Props {
	onClick?: () => void
	children?: any
	className?: string
	addClass?: string
	pills?: boolean
	tabs?: boolean
	secondary?: boolean
}

export class TabsHeader extends PureComponent<Props>{
	static defaultProps = {
		onClick: () => { }
	}

	render() {
		let classNames: string[] = ['nav']
		if (this.props.pills) classNames.push('nav-pills')
		if (this.props.tabs) classNames.push('nav-tabs')
		if (this.props.secondary){
			if (this.props.pills) classNames.push('nav-pills--secondary')
			if (this.props.tabs) classNames.push('nav-tabs--secondary')

		}
		if (this.props.addClass) classNames.push(this.props.addClass)

		return (
			<ul className={this.props.className || classNames.filter(n => n).join(' ')}
				onClick={this.props.onClick}
				role='tablist'
			>
				{this.props.children}
			</ul>
		)
	}
}
