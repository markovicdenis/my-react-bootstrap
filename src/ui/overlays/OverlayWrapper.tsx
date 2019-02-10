import React, { PureComponent, CSSProperties } from 'react'
import { generateClassNames } from '../_utils'

interface Props {
	tag?: 'div' | 'article'
	children?: any
	onClick?: any
	className?: string
	addClass?: string
	style?: CSSProperties
	loading?: Boolean
}


export class OverlayWrapper extends PureComponent<Props>{

	static defaultProps = {
		tag: 'div'
	}

	render() {
		const { tag, addClass, className, loading, ...rest } = this.props
		const Tag: any = `${tag}`
		const classNames: any[] = [addClass]

		if(loading) classNames.push('overlay-wrapper')

		return (
			<Tag className={className || generateClassNames(classNames)} {...rest}>
				{this.props.children}
			</Tag>
		)
	}
}

