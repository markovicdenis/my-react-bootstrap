import React, { Component } from 'react'
import { CloseButton } from '../buttons/CloseButton'
import { delay } from '../_utils'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses, getColorClass } from '../_utils/colorClasses'

const colorLookup = {
  success: 'success',
  failure: 'danger',
  warning: 'warning'
}

export type AlertStatus = 'success' | 'failure' | 'warning'

interface Props {
  onClick?: () => void
  onCloseClick?: () => void
  children?: any
  className?: string
  addClass?: string
  visible?: boolean
  hasCloseButton?: boolean
  color?: colorClasses
  status?: AlertStatus
}

interface State {
  visible?: boolean
  fade?: boolean
}

export class Alert extends Component<Props, State>{
  static defaultProps = {
    hasCloseButton: true,
    onClick: () => { }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: props.visible,
      fade: false
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.visible !== this.props.visible && this.props.visible !== this.state.visible) {
      if (!this.state.visible) this.show()
      else this.hide()
    }
  }

  hide = async () => {
    this.setState({ fade: true })
    await delay(100)
    this.setState({ visible: false, fade: false })
  }

  show = () => {
    this.setState({ visible: true })
  }

  closeClicked = async () => {
    if (this.props.onCloseClick) this.props.onCloseClick()
    else {
      await this.hide()
      if (this.props.onClick) this.props.onClick()
    }
  }

  render() {
    let classNames: any[] = ['alert', this.props.addClass]

    if (this.props.status) classNames.push(getColorClass(colorLookup[this.props.status], 'alert'))
    else if (this.props.color) classNames.push(getColorClass(this.props.color || 'secondary', 'alert'))

    if (this.state.fade) classNames.push('fade')

    if (!this.state.visible) return null

    return (
      <div className={this.props.className || generateClassNames(classNames)} role="alert"
        onClick={this.props.onClick}
      >
        {this.props.children}
        {this.props.hasCloseButton && <CloseButton onClick={this.closeClicked} />}
      </div>
    )
  }
}