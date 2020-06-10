import React, { ChangeEvent, useCallback, HTMLProps } from 'react'
import { generateClassNames } from '../ui/_utils/generateClassNames'
import { getSizeClass } from '../ui/_utils/sizeClasses'
import { FormGroupFactory } from './FormGroupFactory'
import { IBasicInputProps } from '../hoc/basicInput'

export type Props = {
  name: string,
  text?: boolean,
  isValid?: boolean,
  validate?: boolean,
  placeholder?: string,
  value?: any,
  type?: 'text' | 'email' | 'date',
  onChange?: (name: string, value: any) => void
}

type State = {
  value: any
}

// export const Input = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-control' })






export const Input = (props: IBasicInputProps & HTMLProps<HTMLInputElement>) => {
  const { setRef, onChange, handleChange, type = 'text', addClass, color, inputSize, className, children, onClick, loading, value, ...rest } = props
  const classNames: any[] = ['form-control', addClass]

  if (inputSize) classNames.push(getSizeClass(inputSize, 'form-control'))

  const handleChangeFun = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e)
    if (handleChange) handleChange(e, props.name, e.target.value, type)
  }, [])

  return (
    <input className={className || generateClassNames(classNames)} ref={setRef} type={type} onChange={handleChangeFun} value={value} {...rest}>
    </input>
  )
}

export const FGInput = FormGroupFactory<Props, State>(Input)
