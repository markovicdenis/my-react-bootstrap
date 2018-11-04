import React from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'

export interface Props {
	children?: any
	loading?: boolean
	className?: string
	addClass?: string
	circle?: boolean
	outline?: boolean
	onClick?: () => void
	type?: colorClasses
	[key:string]: any
}

export const Button = (props: Props) => {
	const {addClass, circle, outline, type, className, children, onClick, loading, setRef, ...rest} = props
	let classNames: any[] = ['btn', addClass]
	if(circle) classNames.push('btn-circle')
	if(outline) classNames.push(getColorClass(type || 'secondary', 'btn-outline'))
	else classNames.push(getColorClass(type || 'secondary', 'btn'))
	return (
		<button className={className || generateClassNames(classNames)} onClick={onClick} {...rest} ref={setRef}>
			{children}
			{loading && <div className="loader loader--small ml-2"></div>}
		</button>
	)
}