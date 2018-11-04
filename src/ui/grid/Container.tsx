import React from "react"

interface Props {
	className?: string,
	children?: any,
	fluid?: boolean
}

const Container = (props: Props) => {
	let classNames = [props.className]
	if(props.fluid) classNames.unshift('container-fluid')
	else classNames.unshift('container')
	return (
		<div className={classNames.join(' ')}>
			{props.children}
		</div>
	)
}

export default Container
