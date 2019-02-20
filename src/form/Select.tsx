import React from 'react'
import { FormGroupFactory } from './FormGroupFactory'
import Select, { Props as SelectProps } from 'react-select/lib/Select'
import Async, { Props as AsyncProps } from 'react-select/lib/Async'
import { Props as CreatableProps} from 'react-select/lib/Creatable'
import AsyncCreatable from 'react-select/lib/Creatable'


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

interface MSelectProps {
  theme?: any,
  handleChange?: (e: any, name?: string, value?: any) => any
}

export const MSelect = (props: MSelectProps & SelectProps<any>) => {
  let { handleChange, ...rest } = props
  const handleChangeFun = (value: any) => {
    if (props.handleChange) props.handleChange(null, props.name, value)
  }

  if (props.handleChange) rest.onChange = handleChangeFun
  return (
    <Select
      {...rest}
    />
  )
}

export const MAsync = (props: MSelectProps & AsyncProps<any>) => {
  let { handleChange, ...rest } = props
  const handleChangeFun = (value: any) => {
    if (props.handleChange) props.handleChange(null, props.name, value)
  }
  if (props.handleChange) rest.onChange = handleChangeFun
  return (
    <Async
      {...rest}
    />
  )
}

export const MAsyncCreatable = (props: MSelectProps & AsyncProps<any> & CreatableProps<any>) => {
  let { handleChange, ...rest } = props
  const handleChangeFun = (value: any) => {
    if (props.handleChange) props.handleChange(null, props.name, value)
  }
  if (props.handleChange) rest.onChange = handleChangeFun
  return (
    <AsyncCreatable
      {...rest}
    />
  )
}
