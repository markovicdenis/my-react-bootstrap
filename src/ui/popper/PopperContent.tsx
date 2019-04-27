import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Popper as ReactPopper } from 'react-popper'
import { getTarget, targetPropType, mapToCssModules, DOMElement, tagPropType } from '../_utils/utils'
import { Fade } from '../transitions/Fade';
// import Fade from './Fade'

interface Props {
  children?: any
  className?: string
  popperClassName?: string
  arrowClassName?: string
  placement?: string
  placementPrefix?: string
  hideArrow?: boolean
  tag?: string
  isOpen?: boolean
  cssModule?: any
  offset?: number | string
  fallbackPlacement?: string | string[]
  flip?: boolean
  container?: 'body' | 'inline'
  target?: any
  modifiers?: any
  boundariesElement: any
  onClosed?: any
  fade?: boolean
  transition?: any
}

interface State {
  isOpen: boolean
  placement?: string
  mounted?: boolean
}

export class PopperContent extends Component<Props, State> {
  public _element: any
  public targetNode: any

  static defaultProps = {
    boundariesElement: 'scrollParent',
    placement: 'auto',
    hideArrow: false,
    isOpen: false,
    offset: 0,
    fallbackPlacement: 'flip',
    flip: true,
    container: 'body',
    modifiers: {},
    onClosed: () => { },
    fade: true,
    transition: {
      // ...Fade.defaultProps,

    }
  }

  constructor(props) {
    super(props)

    this.state = { isOpen: props.isOpen }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && !state.isOpen) {
      return { isOpen: props.isOpen }
    }
    else return null
  }

  componentDidMount(){
    this.setTargetNode(getTarget(this.props.target))
    this.setState({mounted: true})
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus()
    }
  }

  setTargetNode = (node) => {
    console.log('node', node)
    if(node) this.targetNode = node
  }

  getTargetNode = () => {
    return this.targetNode
  }

  getContainerNode = () => {
    return getTarget(this.props.container)
  }

  getRef = (ref) => {
    this._element = ref
  }

  handlePlacementChange = (data) => {
    if (this.state.placement !== data.placement) {
      this.setState({ placement: data.placement })
    }
    return data
  }

  onClosed = () => {
    this.props.onClosed()
    this.setState({ isOpen: false })
  }

  renderChildren() {
    const {
      cssModule,
      children,
      isOpen,
      flip,
      target,
      offset,
      fallbackPlacement,
      placementPrefix,
      arrowClassName: _arrowClassName,
      hideArrow,
      popperClassName: _popperClassName,
      tag,
      container,
      modifiers,
      boundariesElement,
      onClosed,
      fade,
      transition = {},
      ...attrs
    } = this.props
    const arrowClassName = mapToCssModules(classNames(
      'arrow',
      _arrowClassName
    ), cssModule)
    const placement = this.state.placement || attrs.placement
    //@ts-ignore
    const placementFirstPart = placement.split('-')[0]
    const popperClassName = mapToCssModules(classNames(
      _popperClassName,
      placementPrefix ? `${placementPrefix}-${placementFirstPart}` : placementFirstPart
    ), this.props.cssModule)

    const extendedModifiers = {
      offset: { offset },
      flip: { enabled: flip, behavior: fallbackPlacement },
      preventOverflow: { boundariesElement },
      update: {
        enabled: true,
        order: 950,
        fn: this.handlePlacementChange,
      },
      ...modifiers,
    }

    const popperTransition = {
      ...Fade.defaultProps,
      ...transition,
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0,
    }

    return (
      <Fade
        {...popperTransition}
        {...attrs}
        in={isOpen}
        onExited={this.onClosed}
        tag={tag}
      >
        <ReactPopper
          referenceElement={this.targetNode}
          modifiers={extendedModifiers}
          placement={placement as any}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div ref={ref} style={style} className={popperClassName} x-placement={placement}>
              {children}
              {!hideArrow && <span ref={arrowProps.ref} className={arrowClassName} style={arrowProps.style} />}
            </div>
          )}
        </ReactPopper>
      </Fade>
    )
  }

  render() {
    // this.setTargetNode(getTarget(this.props.target))

    if (this.state.isOpen) {
      return this.props.container === 'inline' ?
        this.renderChildren() :
        ReactDOM.createPortal((<div ref={this.getRef}>{this.renderChildren()}</div>), this.getContainerNode())
    }

    return null
  }
}
