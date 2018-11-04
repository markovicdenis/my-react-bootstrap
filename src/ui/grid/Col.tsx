import React, { PureComponent } from 'react'

interface Props {
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
		this.getClass()
		return (
			<div className={this.props.className || this.classNames.filter(n => n).join(' ')} onClick={this.props.onClick}>
				{this.props.children}
			</div>
		)
	}
}


export class ArticleCol extends Col {
	render() {
		this.getClass()
		return (
			<article className={this.props.className || this.classNames.filter(n => n).join(' ')} onClick={this.props.onClick}>
				{this.props.children}
			</article>
		)
	}
}


export default Col