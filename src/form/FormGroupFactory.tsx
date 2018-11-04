import React, { Component } from 'react'
import get from 'lodash/get'
import { generateClassNames } from '../ui/_utils'

export function FormGroupFactory<P, S>(ReactElement: React.ComponentClass | any) {
	interface FProps {
		name?: string
		className?: string
		addClass?: string
		label?: string
		feedback?: { valid?: any, invalid?: any }
		isValid?: boolean
		validate?: boolean
		showHelp?: boolean
		help?: any
		errors?: any
		maxErrors?: number
	}
	return class FormGroup extends Component<P & FProps, S>{
		static defaultProps = {
			className: 'form-group',
			maxErrors: 2
		}

		extractInvalidFeedback = () => {
			let msg = ''
			if (this.props.errors) {
				let errorMessages: string | string[] = get(this.props.errors, this.props.name, '')
				if (errorMessages) {
					if (typeof errorMessages === 'string') msg = errorMessages
					else if (errorMessages.constructor === Array) {
						msg = errorMessages.slice(0, this.props.maxErrors).join(' ')
					}
				}
			}
			return msg
		}

		render() {
			const ownProps: any = {}
			let name = this.props.name
			let classNames : any[] = [this.props.className]
			let { valid: validFeedback, invalid: invalidFeedback }: any = this.props.feedback || {}

			if (this.props.addClass) classNames.push(this.props.addClass)

			if (!invalidFeedback && this.props.errors) invalidFeedback = this.extractInvalidFeedback()

			if (this.props.validate) {
				if (typeof this.props.isValid === 'boolean') {
					if (this.props.isValid) classNames.push('is-valid')
					else classNames.push('is-invalid')
				} else {
					if (this.props.errors && invalidFeedback) ownProps.isValid = false
				}
			}

			return (
				<div className={generateClassNames(classNames)}>
					{this.props.label && <label htmlFor={`id${name}`}>{this.props.label}</label>}
					<ReactElement {...ownProps}{...this.props}></ReactElement>
					{this.props.help && (!invalidFeedback || this.props.showHelp) &&
						<small id={`help${name}`} className="form-text text-muted">{this.props.help}</small>
					}
					{validFeedback &&
						<div className="valid-feedback">
							{validFeedback}
						</div>
					}
					{invalidFeedback &&
						<div className="invalid-feedback">
							{invalidFeedback}
						</div>
					}
				</div>
			)
		}
	}
}