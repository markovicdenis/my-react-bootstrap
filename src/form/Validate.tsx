import React, { Component, HtmlHTMLAttributes } from 'react'
import { generateClassNames, get } from '../ui/_utils'

type FProps<E extends {}> = E & {
  wId?: string
  wClassName?: string
  wAddClass?: string
  label?: string
  feedback?: { valid?: any, invalid?: any }
  isValid?: boolean
  validate?: boolean
  showHelp?: boolean
  help?: any
  errors?: any
  maxErrors?: number
  id?: string
  name?: string
}

interface Props {
  tag?: string
  addClass?: string
  invalidFeedback?: any
  validFeedback?: any
  isValid?: boolean
}

export const Validate = (props: Props & HtmlHTMLAttributes<HTMLDivElement>) => {
  const { tag = 'div', className, addClass, validFeedback, invalidFeedback, isValid, children, ...rest } = props
  const Tag: any = tag
  const classNames: any[] = ['form-group', addClass]
  if (typeof isValid === 'boolean') {
    if (isValid) classNames.push('is-valid')
    else classNames.push('is-invalid')
  }
  return (
    <Tag className={className || generateClassNames(classNames)} {...rest}>
      {children}
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
    </Tag>
  )
}


function FormGroupFactory<P, S>(ReactElement: React.ComponentClass | any) {
  return class FormGroup extends Component<FProps<P>, S>{
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
      const { wId, wClassName, wAddClass, label, help, showHelp, ...rest } = this.props as any
      let classNames: any[] = [wClassName]
      let { valid: validFeedback, invalid: invalidFeedback }: any = this.props.feedback || {}

      if (wAddClass) classNames.push(wAddClass)

      if (!invalidFeedback && this.props.errors) invalidFeedback = this.extractInvalidFeedback()

      if (this.props.validate) {
        if (typeof this.props.isValid === 'boolean') {
          if (this.props.isValid) classNames.push('is-valid')
          else classNames.push('is-invalid')
        } else {
          if (this.props.errors && invalidFeedback) rest.isValid = false
        }
      }

      return (
        <div className={generateClassNames(classNames)} id={wId}>
          {label && <label htmlFor={this.props.id}>{label}</label>}
          <ReactElement {...rest}></ReactElement>
          {help && (!invalidFeedback || showHelp) &&
            <small className="form-text text-muted">{help}</small>
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