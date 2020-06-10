import React, { Component } from 'react'
import { getTarget, mapToCssModules } from '../_utils/utils'
import { PopperContent, PopperModifiers } from './PopperContent'

function isInDOMSubtree(element, subtreeRoot) {
  return subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element))
}

export interface Props {
  className?: string
  arrowClassName?: string
  popperClassName?: string
  innerClassName?: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  target?: any
  container?: any
  isOpen?: boolean
  disabled?: boolean
  hideArrow?: boolean
  boundariesElement?: any
  cssModule?: any
  toggle?: any
  autohide?: boolean
  placementPrefix?: string
  delay?: { show: number, hide: number } | number
  modifiers?: PopperModifiers
  offset?: [number, number]
  innerRef?: any
  trigger?: string
  fade?: boolean
  flip?: boolean
}

interface State {
  isOpen: boolean
  placement?: string
}

export class TooltipPopoverWrapper extends Component<Props, State> {
  public _target: any = null
  public _popover: any = null
  public _hideTimeout: any
  public _showTimeout: any

  static defaultProps = {
    isOpen: false,
    hideArrow: false,
    autohide: false,
    delay: 0,
    toggle: () => { },
    trigger: 'click',
    fade: true
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return { isOpen: props.isOpen }
    }
    else return null
  }

  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen }
  }

  componentDidMount() {
    this.updateTarget()
  }

  componentWillUnmount() {
    this.removeTargetEvents()
  }

  onMouseOverTooltipContent = () => {
    if (this.props.trigger) {
      const triggers = this.props.trigger ? this.props.trigger.split(' ') : []

      if (triggers.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._hideTimeout) {
          this.clearHideTimeout()
        }
      }
      if (this.state.isOpen && !this.props.isOpen) {
        this.toggle()
      }
    }
  }

  onMouseLeaveTooltipContent = (e) => {
    if (this.props.trigger) {
      const triggers = this.props.trigger ? this.props.trigger.split(' ') : []
      if (triggers.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._showTimeout) {
          this.clearShowTimeout()
        }
        e.persist()
        this._hideTimeout = setTimeout(
          this.hide.bind(this, e),
          this.getDelay('hide')
        )
      }
    }
  }

  onEscKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.hide(e)
    }
  }

  getRef = (ref) => {
    const { innerRef } = this.props
    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(ref)
      } else if (typeof innerRef === 'object') {
        innerRef.current = ref
      }
    }
    this._popover = ref
  }

  getDelay = (key) => {
    const { delay } = this.props
    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? 0 : delay[key]
    }
    return delay
  }

  show = (e) => {
    if (!this.props.isOpen) {
      this.clearShowTimeout()
      this.toggle(e)
    }
  }

  showWithDelay = (e) => {
    if (this._hideTimeout) {
      this.clearHideTimeout()
    }
    this._showTimeout = setTimeout(
      this.show.bind(this, e),
      this.getDelay('show')
    )
  }

  hide = (e) => {
    if (this.props.isOpen) {
      this.clearHideTimeout()
      this.toggle(e)
    }
  }

  hideWithDelay = (e) => {
    if (this._showTimeout) {
      this.clearShowTimeout()
    }
    this._hideTimeout = setTimeout(
      this.hide.bind(this, e),
      this.getDelay('hide')
    )
  }

  clearShowTimeout = () => {
    clearTimeout(this._showTimeout)
    this._showTimeout = undefined
  }

  clearHideTimeout = () => {
    clearTimeout(this._hideTimeout)
    this._hideTimeout = undefined
  }

  handleDocumentClick = (e) => {
    const triggers = this.props.trigger ? this.props.trigger.split(' ') : []

    if (triggers.indexOf('special') > -1) {
      if (this._hideTimeout) {
        this.clearHideTimeout()
      }
      // this.hideWithDelay(e)
      if (this.props.isOpen && !e.target.closest('.popover')) {
        console.log('calling hide')
        this.hideWithDelay(e)
      } else if (!this.props.isOpen) {
        console.log('calling show')
        // this.showWithDelay(e)
      }
    } else if (triggers.indexOf('legacy') > -1 && (this.props.isOpen || isInDOMSubtree(e.target, this._target))) {
      if (this._hideTimeout) {
        this.clearHideTimeout()
      }
      if (this.props.isOpen && !isInDOMSubtree(e.target, this._popover)) {
        this.hideWithDelay(e)
      } else if (!this.props.isOpen) {
        this.showWithDelay(e)
      }
    } else if (triggers.indexOf('click') > -1 && isInDOMSubtree(e.target, this._target)) {
      if (this._hideTimeout) {
        this.clearHideTimeout()
      }

      if (!this.props.isOpen) {
        this.showWithDelay(e)
      } else {
        this.hideWithDelay(e)
      }
    }
  }

  addTargetEvents = () => {
    if (this.props.trigger) {
      let triggers = this.props.trigger ? this.props.trigger.split(' ') : []
      if (triggers.indexOf('manual') === -1) {
        if (triggers.indexOf('click') > -1 || triggers.indexOf('legacy') > -1 || triggers.indexOf('special') > -1) {
          document.addEventListener('click', this.handleDocumentClick, true)
        }

        if (this._target) {
          if (triggers.indexOf('hover') > -1) {
            this._target.addEventListener(
              'mouseover',
              this.showWithDelay,
              true
            )
            this._target.addEventListener(
              'mouseout',
              this.hideWithDelay,
              true
            )
          }
          if (triggers.indexOf('focus') > -1) {
            this._target.addEventListener('focusin', this.show, true)
            this._target.addEventListener('focusout', this.hide, true)
          }
          this._target.addEventListener('keydown', this.onEscKeyDown, true)
        }
      }
    }
  }

  removeTargetEvents = () => {
    if (this._target) {
      this._target.removeEventListener(
        'mouseover',
        this.showWithDelay,
        true
      )
      this._target.removeEventListener(
        'mouseout',
        this.hideWithDelay,
        true
      )
      this._target.removeEventListener('keydown', this.onEscKeyDown, true)
      this._target.removeEventListener('focusin', this.show, true)
      this._target.removeEventListener('focusout', this.hide, true)
    }

    document.removeEventListener('click', this.handleDocumentClick, true)
  }

  updateTarget = () => {
    if (this.props.target) {
      const newTarget = getTarget(this.props.target)
      if (newTarget !== this._target) {
        this.removeTargetEvents()
        this._target = newTarget
        this.addTargetEvents()
      }
    }
  }

  toggle = (e?) => {
    if (this.props.disabled) {
      return e && e.preventDefault()
    }

    return this.props.toggle(e)
  }

  onClosed = () => {
    this.setState({ isOpen: false })
  }

  render() {
    if (!this.state.isOpen) {
      return null
    }

    // this.updateTarget()

    const {
      className,
      cssModule,
      innerClassName,
      target,
      isOpen,
      hideArrow,
      boundariesElement,
      placement,
      placementPrefix,
      arrowClassName,
      popperClassName,
      container,
      modifiers,
      offset,
      fade,
      flip,
      autohide,
      toggle,
      ...attributes
    } = this.props

    // const attributes = omit(this.props, Object.keys(propTypes))

    const popperClasses = mapToCssModules(popperClassName, cssModule)

    const classes = mapToCssModules(innerClassName, cssModule)

    return (
      <PopperContent
        arrowClassName={arrowClassName}
        boundariesElement={boundariesElement}
        className={className as string}
        container={container}
        cssModule={cssModule}
        fade={fade}
        flip={flip}
        hideArrow={hideArrow}
        isOpen={isOpen}
        modifiers={modifiers}
        offset={offset}
        placement={placement}
        placementPrefix={placementPrefix}
        popperClassName={popperClasses}
        target={target}
        onClosed={this.onClosed}
      >
        <div
          {...attributes}
          ref={this.getRef}
          aria-hidden={isOpen}
          className={classes}
          role="tooltip"
          onKeyDown={this.onEscKeyDown}
          onMouseLeave={this.onMouseLeaveTooltipContent}
          onMouseOver={this.onMouseOverTooltipContent}
        />
      </PopperContent>
    )
  }
}
