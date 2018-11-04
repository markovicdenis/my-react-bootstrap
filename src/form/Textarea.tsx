import { FormGroupFactory } from './FormGroupFactory'
import React, { Component, createRef, SyntheticEvent } from 'react'

type Props = {
	name: string,
	rows?: number,
	isValid?: boolean,
	validate?: boolean,
	placeholder?: string,
	value?: any,
	// help?: any,
	// alwaysShow?: boolean,
	onChange: (name:string, value:any)=>void
}

type State = {
	value: any
}


export class Textarea extends Component<Props, State> {
	private textarea = createRef<HTMLTextAreaElement>()

	constructor(props: Props) {
		super(props)
		this.state = {
			value: props.value
		}
	}

	static defaultProps = {
		name: 'name',
		rows: 3
	}

	changeState = (state: any) => {
		this.setState(state)
	}

	onChange = (e: SyntheticEvent) => {
		let target = e.target as HTMLTextAreaElement
		this.setState({ value: target.value })
		this.props.onChange && this.props.onChange(this.props.name, target.value)
	}

	render() {
		const name = this.props.name
		let inputClasses = ['form-control']
		
		if (this.props.validate && typeof this.props.isValid === 'boolean') {
			if (this.props.isValid) inputClasses.push('is-valid')
			else inputClasses.push('is-invalid')
		}

		return (
			<textarea ref={this.textarea} className={inputClasses.join(' ')} id={`id${name}`} aria-describedby={`help${name}`} placeholder={this.props.placeholder} onChange={this.onChange} rows={Number(this.props.rows)} value={this.props.value}></textarea> 
		)
	}
}

export const FGTextarea = FormGroupFactory<Props, State>(Textarea)
