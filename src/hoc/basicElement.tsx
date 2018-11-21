import React, { CSSProperties } from 'react'
import { colorClasses, getColorClass } from '../ui/_utils/colorClasses'
import { generateClassNames } from '../ui/_utils/generateClassNames'

export interface IBasicElementProps {
	tag?: string
	children?: any
	loading?: boolean
	className?: string
	addClass?: string
	onClick?: () => void
	color?: colorClasses
	style?: CSSProperties
	[key: string]: any
}

export interface IBasicElementAdditional {
	defaultClass: string
	defaultTag?: string
	[key: string]: any
}

export function basicElement<P={}>(additionalProps: IBasicElementAdditional, useColor?: { prefix: string, suffix: string }) {
	// interface NewProps extends IBasicElementProps
	return (props: IBasicElementProps & P) => {
		const { defaultClass, defaultTag='div', ...restAdditional } = additionalProps
		const { tag: Tag = defaultTag, addClass, color, className, children, onClick, loading, ...rest } = props as IBasicElementProps
		const classNames: any[] = [defaultClass, addClass]

		if (useColor && color) classNames.push(getColorClass(color, useColor.prefix, useColor.suffix))

		return (
			<Tag className={className || generateClassNames(classNames)} {...rest} {...restAdditional}>
				{children}
			</Tag>
		)
	}
}

// export const Button = (props: BuProps) => {
// 	const { tag:Tag='div', addClass, type, className, children, onClick, loading, setRef, ...rest } = props
// 	let classNames: any[] = ['btn', addClass]
// 	if classNames.push(getColorClass(type || 'secondary', 'btn'))

// 	if(block) classNames.push('btn-block')

// 	return (
// 		<button className={className || generateClassNames(classNames)} onClick={onClick} {...rest} ref={setRef}>
// 			{children}
// 			{loading && <div className={`loader loader--small ml-2 ${getColorClass(type || 'secondary', 'loader-')}`}></div>}
// 		</button>
// 	)
// }