import React, { CSSProperties, InputHTMLAttributes, ChangeEvent } from 'react'
import { colorClasses, getColorClass } from '../ui/_utils/colorClasses'
import { generateClassNames } from '../ui/_utils/generateClassNames'
import { sizeClasses } from '../ui/_utils/sizeClasses'

export interface IBasicInputProps {
	tag?: string
	children?: any
	loading?: boolean
	// className?: string
	addClass?: string
	isValid?: boolean
	color?: colorClasses
	size?: sizeClasses
	setRef?: (item: any) => void
	handleChange?: (e: any, name: string|undefined, value: any, type?: string) => any
	[key: string]: any
}

export interface IBasicInputAdditional {
	defaultClass?: string
	defaultTag?: string
	defaultType?: string
	[key: string]: any
}

export function basicInput<P={}, S=HTMLInputElement>(additionalProps: IBasicInputAdditional, useColor?: { prefix: string, suffix: string }) {
	// interface NewProps extends IBasicElementProps
	return (props: IBasicInputProps & P & InputHTMLAttributes<S>) => {
		const { defaultClass, defaultTag='input', defaultType, ...restAdditional } = additionalProps
		const { setRef, onChange, handleChange, tag: Tag = defaultTag, type = defaultType, addClass, color, className, children, onClick, loading, ...rest } = props as IBasicInputProps
		const classNames: any[] = [defaultClass, addClass]

		if (useColor && color) classNames.push(getColorClass(color, useColor.prefix, useColor.suffix))

		const handleChangeFun = (e: ChangeEvent<HTMLInputElement>) => {
			if(onChange) onChange(e)
			if(handleChange) handleChange(e, props.name, e.target.value, type)
		}

		return (
			<Tag className={className || generateClassNames(classNames)} ref={setRef} type={type} onChange={handleChangeFun} {...rest} {...restAdditional}>
				{children}
			</Tag>
		)
	}
}

// dropdownRef = (item: any) => this.dropdownToggle = item
// export const Button = (props: BuProps) => {
// 	const { tag:Tag='div', addClass, type, className, children, onClick, loading, setRef, ...rest } = props
// 	let classNames: any[] = ['btn', addClass]
// 	if classNames.push(getColorClass(type || 'secondary', 'btn'))

// 	if(block) classNames.push('btn-block')

// 	return (
// 		<button className={className || generateClassNames(classNames)} onClick={onClick} {...rest} ref={setRef}>
// 			{children}
// 			{loading && <div className={`loader loader--small ml-2 ${getColorClass(type || 'secondary', 'loader-')}`}></div>}
// 		</button>
// 	)
// }