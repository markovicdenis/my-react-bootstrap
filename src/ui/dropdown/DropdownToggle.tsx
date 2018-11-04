import React from 'react'
import { Props, Button } from '../buttons/Button';
import { generateClassNames } from '../_utils/generateClassNames';

interface NProps extends Props {
	split?:boolean
}

export const DropdownToggle = (props: NProps) => {
	const classes = ['dropdown-toggle', (props.split ? 'dropdown-toggle-split' : '')]
	const {split, ...newProps} = { ...props, addClass: generateClassNames([props.addClass || '', ...classes]) }
	return (
		<Button {...newProps}>
			{props.children}
		</Button>
	)
}
