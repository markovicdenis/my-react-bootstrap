import React from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../_utils/sizeClasses'
import { Spinner } from '../spinner/Spinner'
import { Spring, Transition, animated } from 'react-spring'

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
	size?: sizeClasses
	[key: string]: any
}

export const Button = (props: ButtonProps) => {
	const { tag = 'button', addClass, block, circle, outline, color, className, children, loading, setRef, size, ...rest } = props
	const Tag: any = tag
	let classNames: any[] = ['btn', addClass]
	if (circle) classNames.push('btn-circle')

	if (outline) classNames.push(getColorClass(color || 'secondary', 'btn-outline'))
	else classNames.push(getColorClass(color || 'secondary', 'btn'))

	if (size) classNames.push(getSizeClass(size, 'btn'))

	if (block) classNames.push('btn-block')

	return (
		<Tag className={className || generateClassNames(classNames)} {...rest} ref={setRef}>
			{children}
			{loading && <Spring
				native
				from={{ width: 0, scale: 0 }}
				to={{ width: 20, scale: 1 }}
			>
				{(props: any) => <animated.div style={{ display: 'inline-block', textAlign: 'right', ...props, transform: `scale(${props.scale})` }}><Spinner grow size="small" /></animated.div>
				}
			</Spring>}
		</Tag>
	)
}


//{loading && <Spinner grow size="small" style={{ marginLeft: '0.45rem' }} />}
//{loading && <div className={`loader loader--small ml-2 ${getColorClass(color || 'secondary', 'loader-')}`}></div>}