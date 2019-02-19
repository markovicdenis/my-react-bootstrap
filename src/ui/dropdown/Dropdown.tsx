import React, { Component } from 'react'
import { _$, isBrowser, generateClassNames, colorClasses } from '../_utils'
import { DropdownToggle } from './DropdownToggle'
import { Spring, animated, config } from 'react-spring/renderprops.cjs'
import { sizeClasses } from '../_utils/sizeClasses'

type DropdownItem = { label: any, value?: any, header?: boolean | 'h5' | 'h6', divider?: boolean, disabled?: boolean, active?: boolean, href?: string }

interface Props {
	toggle?: (ref: any, toggle: any, item?: DropdownItem) => any
	toggleLabel?: any
	toggleClass?: string
	toggleColor?: colorClasses
	toggleSize?: sizeClasses
	dynamic?: boolean
	className?: string
	addClass?: string
	show?: boolean
	name?: string
	value?: any
	items?: DropdownItem[]
	itemsTag?: 'a' | 'button'
	itemsAfter?: DropdownItem[]
	itemClick?: (item: any) => void
	handleChange?: (e: any, name: any, value: any, item: any) => void
	children?: any
	split?: boolean
	alignRight?: boolean
}

interface State {
	item: any
	labelValue?: any
	show?: boolean
	outsideClick?: boolean
	forceUp: boolean
}

export class Dropdown extends Component<Props, State>{
	private dropdownToggle: any
	private dropMenu?: any

	static defaultProps = {
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			item: null,
			show: props.show,
			outsideClick: false,
			forceUp: false,
			labelValue: undefined
		}
	}

	componentDidMount() {
		if (document) document.addEventListener('mousedown', this.menuClick)
		if (window) {
			window.addEventListener('scroll', this.handleScroll)
			window.addEventListener('resize', this.handleScroll)
		}
		this.handleScroll()
		// if (this.dropdownToggle) {
		// 	this.dropdownElement = _$(this.dropdownToggle)
		// 	// this.dropdownElement.dropdown()
		// }
	}

	componentWillUnmount() {
		if (document) document.removeEventListener('mousedown', this.menuClick)
		if (window) {
			window.removeEventListener('scroll', this.handleScroll)
			window.removeEventListener('', this.handleScroll)
		}
	}

	dropdownRef = (item: any) => this.dropdownToggle = item

	toggle = async () => {
		// console.log(this.dropMenu)
		// console.log(this.dropMenu.getBoundingClientRect().height)
		// console.log(this.dropMenu.offsetHeight)
		// console.log()
		// try {
		// 	const offsetBottom = window.innerHeight - this.dropMenu.getBoundingClientRect().bottom
		// 	if (offsetBottom < 10) this.setState({ forceUp: true })
		// 	else {
		// 		await delay(300)
		// 		this.setState({forceUp: false})
		// 	}
		// } catch (error) { }
		this.setState({ show: !this.state.show })
		// if (this.dropdownElement) this.dropdownElement.dropdown('toggle')
	}

	itemClick = (e: any, item: DropdownItem) => {
		let value = item.value
		if(!value && typeof value !== 'boolean') value = item.label
		if (this.props.itemClick) this.props.itemClick(item)
		if (this.props.handleChange) this.props.handleChange(e, this.props.name, value, item)
		this.setState({ item, show: false })
	}

	menuClick = (e: any) => {
		if (this.dropMenu && !this.dropMenu.contains(e.target) && this.dropdownToggle !== e.target) { // && !e.target.classList.contains('dropdown-toggle')){
			this.setState({ show: false })
		}
	}

	handleScroll = () => {
		let offsetBottom = window.innerHeight - this.dropdownToggle.getBoundingClientRect().bottom
		let { forceUp } = this.state
		let height = 100
		if (this.dropMenu) height = this.dropMenu.offsetHeight
		if (offsetBottom < 100 && !forceUp) this.setState({ forceUp: true })
		if (offsetBottom > 100 && forceUp) this.setState({ forceUp: false })
	}

	renderItems = (items: DropdownItem[]) => {
		if (!isBrowser) return []
		return items.map((item: DropdownItem, index: number) => {
			let Tag: any = 'a'
			let className = 'dropdown-item'
			const { active, disabled, label, divider, header, ...rest } = item
			if (divider) return <div key={`divider${index}`} className="dropdown-divider"></div>
			if (header) {
				Tag = typeof header === 'string' ? header : 'h6'
				return <Tag key={`header${label}`}>{label}</Tag>
			}
			if (disabled) className += ' disabled'
			if (active || 
				(typeof item.value !== 'undefined' && this.props.value === item.value ) ||
				(this.state.item && this.state.item.label === item.label)
				) className += ' active'

			if (Tag === 'a' && !item.href) rest.href = '#'
			// if(Tag === 'button') rest.type='button'
			return <Tag key={`${label}$`} className={className} onClick={(e: any) => this.itemClick(e, item)} {...rest}>{item.label}</Tag>
		})
	}

	getValue = () => {
		const { toggleLabel, dynamic, value, items=[] } = this.props
		let { item } = this.state
		if (dynamic || typeof value !== 'undefined') {
			if(!item){
				item = items.filter((di) => di.value === value || di.label === value)[0] || {}
			}
			return item.label || item.value || toggleLabel
		}
		return toggleLabel
		// dynamic ? (item.label || toggleLabel) : toggleLabel
	}

	render() {
		const { show, item } = this.state
		const { className, addClass, toggle, toggleColor, toggleSize, split, items, children, itemsAfter } = this.props
		let classNames = [(split ? 'btn-group' : 'dropdown'), addClass]
		let dropdownClassNames = ['dropdown-menu', (this.props.alignRight ? 'dropdown-menu-right' : '')]
		if (this.state.forceUp) classNames.push('dropup')
		// if (mounted || show) {
		// 	// classNames.push('show')
		// 	dropdownClassNames.push('show')
		// }
		// if(show){
		// 	classNames.push('show')
		// }
		return (
			<div className={className || generateClassNames(classNames)}>
				{toggle ?
					toggle(this.dropdownRef, this.toggle, item || {}) :
					(<DropdownToggle onClick={this.toggle} setRef={this.dropdownRef} color={toggleColor} size={toggleSize}>
						{this.getValue()}
					</DropdownToggle>)
				}
				<Spring
					force
					native
					config={{ ...config.stiff, precision: 0.1 }}
					// immediate={show}
					// config={{ tension: 200, friction: 100, precision: 1 }}
					from={{ height: 0, opacity: 0 }}
					to={{
						height: show? 'auto' : 0,
						opacity: show ? 1 : 0,
						// transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)',
					}}
				>
					{(styleProps) => (
						<animated.div className={generateClassNames(dropdownClassNames)} style={{ 
							pointerEvents: show ? 'auto' : 'none', display: show? 'block' :'none',...styleProps }} ref={(c: any) => this.dropMenu = c}>
							{items && this.renderItems(items)}
							{children}
							{itemsAfter && this.renderItems(itemsAfter)}
						</animated.div>
					)}
				</Spring>

			</div>
		)
	}
}


/*
<Dropdown
	toggle={(ref, toggle, item) => (
		<DropdownToggle type="dark" onClick={toggle} data-toggle="dropdown" setRef={ref}>
			{item.label || 'aaaassssssssssss'}
		</DropdownToggle>
	)}
	items={[{ label: 'Aloha' }]}
>
</Dropdown>
<Dropdown
	split
	toggle={(ref, toggle, item) => (
		<>
			<Button onClick={()=>{}}>omg</Button>
			<DropdownToggle split type="dark" onClick={toggle} data-toggle="dropdown" setRef={ref}></DropdownToggle>
		</>
	) }
	items={[{ label: 'Aloha' }]}
>
</Dropdown>
*/