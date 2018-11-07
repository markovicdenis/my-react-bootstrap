import { FormGroupFactory } from './FormGroupFactory'
import React, { Component, createRef, SyntheticEvent } from 'react'

export type Props = {
	name: string,
	// className?: string,
	// invalidFeedback?: any,
	// validFeedback?: any,
	// label?: string,
	text?: boolean,
	isValid?: boolean,
	validate?: boolean,
	placeholder?: string,
	value?: any,
	// help?: any,
	type?: 'text' | 'email',
	// alwaysShow?: boolean,
	onChange: (name: string, value: any) => void
}

type State = {
	value: any
}


export class Input extends Component<Props, State> {
	private input = createRef<HTMLInputElement>()

	constructor(props: Props) {
		super(props)
		this.state = {
			value: props.value
		}
	}

	static defaultProps = {
		name: 'name',
		type: 'text',
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props.value !== prevProps.value && this.props.value !== this.state.value) {
			this.setState({ value: this.props.value })
		}
	}

	changeState = (state: any) => {
		this.setState(state)
	}

	onChange = (e: SyntheticEvent) => {
		let target = e.target as HTMLInputElement
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
			<input ref={this.input} type={this.props.type} className={inputClasses.join(' ')} id={`id${name}`} aria-describedby={`help${name}`} placeholder={this.props.placeholder} onChange={this.onChange} value={this.state.value} />
		)
	}
}

export const FGInput = FormGroupFactory<Props, State>(Input)
