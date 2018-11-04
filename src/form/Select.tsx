import React from 'react'
import { FormGroupFactory } from './FormGroupFactory'
import { Props as SelectProps } from 'react-select/lib/Select'
import { Props as AsyncProps } from 'react-select/lib/Async'
import Select, {Creatable, Async, AsyncCreatable} from 'react-select'


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
interface MySelectProps<G> extends SelectProps<G>{
	theme?: any
}

export const MySelect = (props:MySelectProps<any>) => {
	return (							
		<Select 
			{...props}
			// @ts-ignore
			// theme={(theme) => {}}
		/>
	)
}

export const FGSelect =  FormGroupFactory<MySelectProps<any>, any>(MySelect)


/**
 * Async
 */
interface MyAsyncProps<G> extends AsyncProps<G>{
	theme?: any
}

export const MyAsyncSelect = (props:MyAsyncProps<any>) => {
	return (							
		<Async 
			{...props}
			// @ts-ignore
			// theme={(theme) => {}}
		/>
	)
}

export const FGAsyncSelect =  FormGroupFactory<MyAsyncProps<any>, any>(MyAsyncSelect)