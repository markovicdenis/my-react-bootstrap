import React, { ChangeEvent, CSSProperties } from 'react'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { generateClassNames } from '../_utils/generateClassNames'
import { sizeClasses, getSizeClass } from '../_utils/sizeClasses'

interface Props {
  name?: string
  checked?: boolean
  className?: string
  addClass?: string
  round?: boolean
  style?: CSSProperties
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void
  handleChange?: (e:ChangeEvent<HTMLInputElement>, name?: string, value?: any) => void

  [key: string]: any
}

export const Toggle = (props: Props) => {
  const { className = 'switch', style, addClass, name, round = true, onChange, handleChange, checked, ...rest } = props

  let classNames: any[] = [className, addClass]
  // if (round) classNames.push('switch-round')

  const change = (e: ChangeEvent<HTMLInputElement>) =>{
    // console.log(e.target.checked)
    if (onChange) onChange(e)
    else if(handleChange) handleChange(e, name, !checked)
  }

  return (
    <label className={generateClassNames(classNames)} style={style}>
      <input type="checkbox" checked={checked} onChange={change}/>
      <span className={generateClassNames(['slider', round? 'round': undefined])}></span>
    </label>
  )
}