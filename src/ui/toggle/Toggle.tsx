import React, { ChangeEvent } from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../_utils/sizeClasses'

interface Props {
	checked?: boolean
	className?: string
	addClass?: string
	round?: boolean
	onChange?: (e:ChangeEvent<HTMLInputElement>) => void
	[key: string]: any
}

export const Toggle = (props: Props) => {
	const { className = 'switch', addClass, round = true, onChange, checked, ...rest } = props

	let classNames: any[] = [className, addClass]
	// if (round) classNames.push('switch-round')

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>{
		// console.log(e.target.checked)
		if(onChange)onChange(e)
	}

	return (
		<label className={generateClassNames(classNames)}>
			<input type="checkbox" checked={checked} onChange={handleOnChange}/>
			<span className={generateClassNames(['slider', round? 'round': undefined])}></span>
		</label>
	)
}