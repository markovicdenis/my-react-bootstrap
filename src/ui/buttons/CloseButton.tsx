import React from 'react'

export const CloseButton = (props:any) => {
	return (
		<button type="button" className="close" aria-label="Close" onClick={props.onClick}>
			<span aria-hidden="true">&times;</span>
		</button>
	)
}
