// import React from "react"

// interface Props {
// 	className?: string,
// 	containerClassName?: string,
// 	children?: any,
// 	nocontainer?: boolean
// }

// export const Main = (props:Props) => {
// 	let className = ['main', props.className].join(' ')
// 	let containerClassName = props.containerClassName || 'container'
// 	let content = <div className={containerClassName}>{props.children}</div>
// 	if (props.nocontainer) content = props.children
// 	return (
// 		<div className={className}>
// 			{content}
// 		</div>
// 	)
// }

import { basicElement } from '../../hoc/basicElement'

export const Main = basicElement({ defaultClass: 'main' })