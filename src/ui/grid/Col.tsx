import React, { PureComponent } from 'react'
import { generateClassNames } from '../_utils'

interface Props {
	tag?: 'div'|'article'
	children?: any
	onClick?: any
	className?: string
	addClass?: string
	w?: boolean
	xs?: number | boolean | 'auto'
	sm?: number | boolean | 'auto'
	md?: number | boolean | 'auto'
	lg?: number | boolean | 'auto'
	xl?: number | boolean | 'auto'
}

const sizes: string[] = ['sm', 'md', 'lg']


export class Col extends PureComponent<Props>{
	protected classNames: string[] = []

	static defaultProps = {
		tag: 'div'
	}

	getClass(){
		if (this.props.w) {
			this.classNames.unshift('w-100')
		} else {
			sizes.forEach((size: string) => {
				const propsSize: string = (this.props as any)[size]
				if (size === 'xs') {
					if (typeof propsSize === 'number') this.classNames.unshift(`col-${propsSize}`)
					else if (propsSize === 'auto') this.classNames.push(`col-auto`)
					else this.classNames.unshift(`col`)
				}
				else if (propsSize) {
					if (typeof propsSize === 'number') this.classNames.unshift(`col-${size}-${propsSize}`)
					else if (propsSize === 'auto') this.classNames.push(`col-${size}-auto`)
					else this.classNames.unshift(`col-${size}`)
				}
			})

			if (this.classNames.length < 1) this.classNames.push('col')
		}
		if (this.props.addClass) this.classNames.push(this.props.addClass)
	}

	render() {
		const Tag = `${this.props.tag}`
		this.getClass()
		return (
			<Tag className={this.props.className || generateClassNames(this.classNames)} onClick={this.props.onClick}>
				{this.props.children}
			</Tag>
		)
	}
}


export class ArticleCol extends Col {
	static defaultProps = {
		tag: 'article'
	}
}
