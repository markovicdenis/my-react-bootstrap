import { basicInput } from '../hoc/basicInput'
import React, { HTMLProps, ChangeEvent, useRef } from 'react'
import { generateClassNames } from '../ui/_utils'

export const Radio = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-check-input', defaultType: 'radio' })


export const CheckLabel = (props: HTMLProps<HTMLLabelElement>) => {
  const { children, ...rest } = props
  return (
    <label className="form-check-label" {...rest}>
      {children}
    </label>
  )
}

export const CheckInput = (props: { innerRef?: any } & HTMLProps<HTMLInputElement>) => {
  const { children, innerRef, ...rest } = props
  return (
    <input ref={innerRef} className="form-check-input" type="radio" {...rest}></input>
  )
}

interface CheckProps extends HTMLProps<HTMLInputElement> {
  id?: string
  type?: 'radio' | 'checkbox'
  addClass?: string
  className?: string
  inline?: boolean
  showLabel?: boolean
  currentValue?: any
  handleChange?: (e: any, name: string | undefined, value: any, type?: string) => any
}

export const Check = (props: CheckProps) => {
  const { className = 'form-check', id, children, currentValue, addClass, inline, handleChange, onChange, showLabel = true, type = 'radio', ...rest } = props
  const classes = [className, addClass]
  const inputRef = useRef<HTMLInputElement>()

  if (inline) classes.push('form-check-inline')

  const handleChangeFun = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e)
    if (handleChange) handleChange(e, props.name, e.target.value, type)
  }

  const labeClick = () => {
    if (inputRef.current) inputRef.current.click()
  }

  return (
    <div className={generateClassNames(classes)}>
      <CheckInput innerRef={inputRef} type={type} id={id} onChange={handleChangeFun} checked={props.value === currentValue} {...rest} />
      {showLabel && <CheckLabel htmlFor={id} onClick={labeClick}>{children}</CheckLabel>}
    </div>
  )
}