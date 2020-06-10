import React, { HTMLAttributes } from 'react'
import { generateClassNames } from '../_utils'

interface Props extends HTMLAttributes<any> {
  tag?: string,
  className?: string,
}

export const PopoverBody = (props: Props) => {
  const { className, tag = 'div', ...attributes } = props
  const Tag: any = tag

  const classes = generateClassNames([className, 'popover-body'])

  return (
    <Tag {...attributes} className={classes} />
  )
}
