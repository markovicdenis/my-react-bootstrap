import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import classNames from 'classnames'
import { Popper as ReactPopper, Modifier } from 'react-popper'
import { getTarget } from '../_utils/utils'
import { Fade } from '../transitions/Fade'
import { generateClassNames } from '../_utils'

export type PopperModifiers = Partial<Modifier<any, any>>[]
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
  offset?: [number, number]
  fallbackPlacement?: string | string[]
  flip?: boolean
  container?: 'body' | 'inline'
  target?: any
  modifiers?: PopperModifiers
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
    offset: [0, 20],
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

  componentDidMount() {
    // this.setTargetNode(getTarget(this.props.target))
    this.setState({ mounted: true })
  }

  componentDidUpdate() {
    if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
      this._element.childNodes[0].focus()
    }
  }

  setTargetNode = (node) => {
    if (node) this.targetNode = node
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
    // const arrowClassName = mapToCssModules(classNames(
    //   'arrow',
    //   _arrowClassName
    // ), cssModule)

    const arrowClassName = generateClassNames(['arrow', _arrowClassName])
    const placement = this.state.placement || attrs.placement
    //@ts-ignore
    const placementFirstPart = placement.split('-')[0]
    // const popperClassName = mapToCssModules(classNames(
    //   _popperClassName,
    //   placementPrefix ? `${placementPrefix}-${placementFirstPart}` : placementFirstPart
    // ), this.props.cssModule)
    const popperClassName = generateClassNames([_popperClassName, placementPrefix ? `${placementPrefix}-${placementFirstPart}` : placementFirstPart])

    // TODO: fix modifiers with new version of popper (those below are not used)
    // TODO: remove the -0.3rem positioning on arrow style
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
        tag={tag}
        onExited={this.onClosed}
      >
        <ReactPopper
          // modifiers={extendedModifiers}
          modifiers={[
            { name: 'offset', enabled: true, options: { offset } },
            { name: 'sfs', enabled: true, phase: 'afterMain', fn: (args) => this.handlePlacementChange(args.state) }, { name: 'preventOverflow', options: { boundary: boundariesElement ?? 'clippingParents' } }
          ]}
          placement={placement as any}
          referenceElement={this.targetNode}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div ref={ref} className={popperClassName} style={style} x-placement={placement}>
              {children}
              {!hideArrow && <span ref={arrowProps.ref} className={arrowClassName} style={{ ...arrowProps.style, left: '-0.3rem' }} />}
            </div>
          )}
        </ReactPopper>
      </Fade>
    )
  }

  render() {
    if (this.state.mounted) this.setTargetNode(getTarget(this.props.target))

    if (this.state.mounted && this.state.isOpen) {
      return this.props.container === 'inline' ?
        this.renderChildren() :
        ReactDOM.createPortal((<div ref={this.getRef}>{this.renderChildren()}</div>), this.getContainerNode())
    }

    return null
  }
}
