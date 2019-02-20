import React from 'react'
import { ButtonProps as Props, Button } from '../buttons/Button'
import { generateClassNames } from '../_utils/generateClassNames'

interface NProps extends Props {
  split?: boolean
  dataTogle?: boolean
}

export const DropdownToggle = (props: NProps) => {
  const classes = ['dropdown-toggle', (props.split ? 'dropdown-toggle-split' : '')]
  const { split, dataTogle, ...newProps } = { ...props, addClass: generateClassNames([props.addClass, ...classes]) }

  return (
    // <Button {...newProps} data-toggle={dataTogle || 'dropdown'}>
    <Button {...newProps}>
      {props.children}
    </Button>
  )
}
