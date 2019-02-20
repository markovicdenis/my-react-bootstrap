import React, { InputHTMLAttributes, ChangeEvent } from 'react'
import { colorClasses, getColorClass } from '../ui/_utils/colorClasses'
import { generateClassNames } from '../ui/_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../ui/_utils/sizeClasses'

export interface IBasicInputProps {
  tag?: string
  children?: any
  loading?: boolean
  addClass?: string
  isValid?: boolean
  color?: colorClasses
  inputSize?: sizeClasses
  setRef?: (item: any) => void
  handleChange?: (e: any, name: string | undefined, value: any, type?: string) => any
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
    const { defaultClass, defaultTag = 'input', defaultType, ...restAdditional } = additionalProps
    const { setRef, onChange, handleChange, tag = defaultTag, type = defaultType, addClass, color, inputSize, className, children, onClick, loading, ...rest } = props as IBasicInputProps
    const Tag : any = tag
    const classNames: any[] = [defaultClass, addClass]

    if (useColor && color) classNames.push(getColorClass(color, useColor.prefix, useColor.suffix))

    if (inputSize) classNames.push(getSizeClass(inputSize, defaultClass))

    const handleChangeFun = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e)
      if (handleChange) handleChange(e, props.name, e.target.value, type)
    }

    return (
      <Tag className={className || generateClassNames(classNames)} ref={setRef} type={type} onChange={handleChangeFun} {...rest} {...restAdditional}>
        {children}
      </Tag>
    )
  }
}