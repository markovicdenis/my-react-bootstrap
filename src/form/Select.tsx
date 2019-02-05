import React from 'react'
import { FormGroupFactory } from './FormGroupFactory'
import { Props as SelectProps } from 'react-select/lib/Select'
import { Props as AsyncProps } from 'react-select/lib/Async'
import { Props as CreatableProps } from 'react-select/lib/Creatable'
import Select, { Creatable, Async, AsyncCreatable } from 'react-select'


// const Select = FormGroupFactory<SelectProps<any>, any>(Select2)
const customStyles = {
	option: (base: any, state: any) => ({
		...base,
		// borderBottom: '1px dotted pink',
		// color: state.isFullscreen ? 'red' : 'blue',
		// padding: 20,
	}),
	control: (base: any) => ({
		// none of react-selects styles are passed to <View />
		...base,
		width: 200,
	}),
	singleValue: (base: any, state: any) => {
		const opacity = state.isDisabled ? 0.5 : 1
		const transition = 'opacity 300ms'

		return { ...base, opacity, transition }
	}
}

/**
 * Select
 */
interface MSelectProps {
	theme?: any,
	handleChange?: (e: any, name?: string, value?: any) => any
}


export const MSelect = (props: MSelectProps & SelectProps<any>) => {
	let { handleChange, ...rest } = props
	const handleChangeFun = (value: any) => {
		if (props.handleChange) props.handleChange(null, props.name, value)
	}
	//@ts-ignore
	if (props.handleChange) rest.onChange = handleChangeFun
	return (
		<Select
			{...rest}
		// @ts-ignore
		// theme={(theme) => {}}
		/>
	)
}

export const MAsync = (props: MSelectProps & AsyncProps<any>) => {
	let { handleChange, ...rest } = props
	const handleChangeFun = (value: any) => {
		if (props.handleChange) props.handleChange(null, props.name, value)
	}
	//@ts-ignore
	if (props.handleChange) rest.onChange = handleChangeFun
	return (
		<Async
			{...rest}
		// @ts-ignore
		// theme={(theme) => {}}
		/>
	)
}

export const MAsyncCreatable = (props: MSelectProps & AsyncProps<any> & CreatableProps<any>) => {
	let { handleChange, ...rest } = props
	const handleChangeFun = (value: any) => {
		if (props.handleChange) props.handleChange(null, props.name, value)
	}
	//@ts-ignore
	if (props.handleChange) rest.onChange = handleChangeFun
	return (
		<AsyncCreatable
			{...rest}
		// @ts-ignore
		// theme={(theme) => {}}
		/>
	)
}
