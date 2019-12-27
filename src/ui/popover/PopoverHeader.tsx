import React, { HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { mapToCssModules, tagPropType } from '../_utils/utils'
import { generateClassNames } from '../_utils'

interface Props extends HTMLAttributes<HTMLDivElement>{
  tag?: string,
  className?: string,
}

export const PopoverHeader = (props: Props) => {
  const { className, tag = 'h3', ...attributes } = props
  const Tag : any = tag

  const classes = generateClassNames([className, 'popover-header'])

  return (
    <Tag {...attributes} className={classes} />
  )
}
