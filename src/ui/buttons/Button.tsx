import React from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'

export interface ButtonProps {
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
	const { addClass, block, circle, outline, color, className, children, onClick, loading, setRef, ...rest } = props
	let classNames: any[] = ['btn', addClass]
	if (circle) classNames.push('btn-circle')
	if (outline) classNames.push(getColorClass(color || 'secondary', 'btn-outline'))
	else classNames.push(getColorClass(color || 'secondary', 'btn'))

	if(block) classNames.push('btn-block')
	
	return (
		<button className={className || generateClassNames(classNames)} onClick={onClick} {...rest} ref={setRef}>
			{children}
			{loading && <div className={`loader loader--small ml-2 ${getColorClass(color || 'secondary', 'loader-')}`}></div>}
		</button>
	)
}