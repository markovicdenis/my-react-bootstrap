import React, { PureComponent, CSSProperties } from 'react'
import { generateClassNames } from '../_utils'

interface Props {
  tag?: 'div' | 'article'
  children?: any
  onClick?: any
  className?: string
  addClass?: string
  style?: CSSProperties
  w?: boolean
  xs?: number | boolean | 'auto'
  sm?: number | boolean | 'auto'
  md?: number | boolean | 'auto'
  lg?: number | boolean | 'auto'
  xl?: number | boolean | 'auto'
}

const sizes: string[] = ['xs', 'sm', 'md', 'lg']


export class Col extends PureComponent<Props>{
  protected classNames: string[] = []

  static defaultProps = {
    tag: 'div'
  }

  getClass() {
    this.classNames = []
    if (this.props.w) {
      this.classNames.unshift('w-100')
    } else {
      sizes.forEach((size: string) => {
        const propsSize: string = (this.props as any)[size]
        if (propsSize && size === 'xs') {
          if (typeof propsSize === 'number') this.classNames.unshift(`col-${propsSize}`)
          else if (propsSize === 'auto') this.classNames.push(`col-auto`)
          else this.classNames.unshift(`col`)
        }
        else if (propsSize) {
          if (typeof propsSize === 'number') this.classNames.unshift(`col-${size}-${propsSize}`)
          else if (propsSize === 'auto') this.classNames.push(`col-${size}-auto`)
          else this.classNames.unshift(`col-${size}`)
        }
      })

      if (this.classNames.length < 1) this.classNames.push('col')
    }
    if (this.props.addClass) this.classNames.push(this.props.addClass)
  }

  render() {
    const { tag, addClass, xs, sm, md, lg, xl, ...rest } = this.props
    const Tag: any = `${tag}`
    this.classNames.push(addClass as string)
    this.getClass()
    return (
      <Tag className={this.props.className || generateClassNames(this.classNames)} {...rest}>
        {this.props.children}
      </Tag>
    )
  }
}

export class ArticleCol extends Col {
  static defaultProps = {
    tag: 'article'
  }
}

