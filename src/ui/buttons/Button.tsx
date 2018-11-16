import React from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'

export interface ButtonProps {
	tag?: 'button' | 'a' | string
	children?: any
	block?: boolean
	loading?: boolean
	className?: string
	addClass?: string
	circle?: boolean
	outline?: boolean
	onClick?: () => void
	color?: colorClasses
	[key: string]: any
}

export const Button = (props: ButtonProps) => {
	const { tag: Tag = 'button', addClass, block, circle, outline, color, className, children, loading, setRef, ...rest } = props
	let classNames: any[] = ['btn', addClass]
	if (circle) classNames.push('btn-circle')
	if (outline) classNames.push(getColorClass(color || 'secondary', 'btn-outline'))
	else classNames.push(getColorClass(color || 'secondary', 'btn'))

	if(block) classNames.push('btn-block')
	
	return (
		<Tag className={className || generateClassNames(classNames)} {...rest} ref={setRef}>
			{children}
			{loading && <div className={`loader loader--small ml-2 ${getColorClass(color || 'secondary', 'loader-')}`}></div>}
		</Tag>
	)
}