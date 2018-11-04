import React from 'react'

interface Props {
	className?: string,
	children?: any,
	onClick?: any,
	tag?: string
}

export const ModalBody = (props:Props) => {
	let Tag = props.tag || 'div'
	let className = ['modal-body', props.className].join(' ')
	return (
		<Tag className={className} onClick={props.onClick}>
			{props.children}
		</Tag>
	)
}