import React from 'react'

interface Props{
	onClick?: () => void
	children?: any
	className?: string
	addClass?: string
	form?: boolean
}

const Row = (props: Props) => {
	let classNames = ['row']
	if(props.form) classNames = ['form-row']
	if(props.addClass) classNames.push(props.addClass)
	return (
		<div className={props.className || classNames.filter(n => n).join(' ')} onClick={props.onClick}>
			{props.children}
		</div>
	)
}

export default Row