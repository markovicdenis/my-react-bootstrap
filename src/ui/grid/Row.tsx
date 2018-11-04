import React from 'react'
import { generateClassNames } from '../_utils'

interface Props {
	onClick?: () => void
	children?: any
	className?: string
	addClass?: string
	form?: boolean
}

export const Row = (props: Props) => {
	let classNames = ['row']
	if(props.form) classNames = ['form-row']
	if(props.addClass) classNames.push(props.addClass)
	return (
		<div className={props.className || generateClassNames(classNames)} onClick={props.onClick}>
			{props.children}
		</div>
	)
}
