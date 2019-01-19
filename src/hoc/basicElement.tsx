import React, { CSSProperties, HTMLAttributes } from 'react'
import { colorClasses, getColorClass } from '../ui/_utils/colorClasses'
import { generateClassNames } from '../ui/_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../ui/_utils/sizeClasses'

export interface IBasicElementProps {
	tag?: string
	isLoading?: boolean
	addClass?: string
	item?: any
	handleClick?: (e: any, item?: any) => any
	color?: colorClasses
	size?: sizeClasses
	style?: CSSProperties
	[key: string]: any
}

export interface IBasicElementAdditional {
	defaultClass?: string
	defaultTag?: string
	[key: string]: any
}

// function getPartialProps(props: any){
// 	const {handleProps} = props
// 	if(handleProps){
// 		try {
// 			const newProps : any = {}
// 			handleProps.split('|').forEach((prop: string) => newProps[prop] = props[prop])	
// 			return newProps
// 		} catch (error) {
// 			return props
// 		}
// 	}
// 	return props
// }

export function basicElement<P={}, S=HTMLDivElement>(additionalProps: IBasicElementAdditional, useColor?: { prefix: string, suffix: string }) {
	// interface NewProps extends IBasicElementProps
	return (props: IBasicElementProps & HTMLAttributes<S>) => {
		const { defaultClass, defaultTag='div', ...restAdditional } = additionalProps
		const { tag = defaultTag, setRef, onClick, item, handleClick, addClass, color, className, children, isLoading, size, ...rest } = props as IBasicElementProps
		const classNames: any[] = [defaultClass, addClass]
		const Tag:any = tag

		if (useColor && color) classNames.push(getColorClass(color, useColor.prefix, useColor.suffix))
		if (size) className.push(getSizeClass(size, defaultClass))

		// let partialProps = getPartialProps(props)
		const handleClickFun = (e: any) => {
			if(onClick) onClick(e)
			if(handleClick) {
				handleClick(e, item || props)
			}
		}

		let classNameGen = className || generateClassNames(classNames)
		if(classNameGen) rest.className = classNameGen

		return (
			<Tag ref={setRef} onClick={handleClickFun} {...rest} {...restAdditional}>
				{children}
			</Tag>
		)
	}
}


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