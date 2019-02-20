import React, { PureComponent } from 'react'

interface Props {
  onClick?: () => void
  children?: any
  className?: string
  addClass?: string
  active?: boolean
}

export class TabsLink extends PureComponent<Props>{
  static defaultProps = {
    onClick: () => { },
    className: 'nav-item'
  }

  render() {
    let classNames: any[] = [this.props.className]
    let classNamesLink = ['nav-link']
    if (this.props.addClass) classNames.push(this.props.addClass)
    if (this.props.active) classNamesLink.push('active')

    return (
      <li className={classNames.filter(n => n).join(' ')}>
        <a className={classNamesLink.filter(n => n).join(' ')} href="#" 
          onClick={this.props.onClick}
          role="tab"
          aria-selected={this.props.active}
        >
          {this.props.children}
        </a>
      </li>
    )
  }
}

