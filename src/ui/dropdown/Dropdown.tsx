import React, { Component, createRef, RefObject } from 'react'
import { _$, isBrowser, generateClassNames } from '../_utils'
import { Button } from '../buttons/Button'
import { DropdownToggle } from './DropdownToggle'
import { Spring, animated, config } from 'react-spring'

type DropdownItem = { label: any, value?: any, header?: boolean | 'h5' | 'h6', divider?: boolean, disabled?: boolean, active?: boolean, href?: string }

interface Props {
	toggle?: (ref: any, toggle: any, item?: DropdownItem) => any
	toggleComponent?: any
	className?: string
	addClass?: string
	show?: boolean
	items?: DropdownItem[]
	itemsTag?: 'a' | 'button'
	itemsAfter?: DropdownItem[]
	itemClick?: (item: any) => void
	children?: any
	split?: boolean
	alignRight?: boolean
}

interface State {
	item: any
	show?: boolean
	mounted?: boolean
	outsideClick?: boolean
}

export class Dropdown extends Component<Props, State>{
	private dropdownToggle: any
	private dropdownElement: any
	private dropMenu?: any

	static defaultProps = {
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			item: {},
			show: props.show,
			mounted: false,
			outsideClick: false
		}
	}

	componentDidMount() {
		this.setState({ mounted: true })
		if (document) document.addEventListener('mousedown', this.menuClick)
		// if (this.dropdownToggle) {
		// 	this.dropdownElement = _$(this.dropdownToggle)
		// 	// this.dropdownElement.dropdown()
		// }
	}

	componentWillUnmount(){
		if (document) document.removeEventListener('mousedown', this.menuClick)
	}

	dropdownRef = (item: any) => this.dropdownToggle = item

	toggle = () => {
		this.setState({ show: !this.state.show })
		// if (this.dropdownElement) this.dropdownElement.dropdown('toggle')
	}

	itemClick = (item: DropdownItem) => {
		if (this.props.itemClick) this.props.itemClick(item)
		this.setState({ item, show: false })
	}

	menuClick = (e: any) => {
		if (this.dropMenu && !this.dropMenu.contains(e.target) && this.dropdownToggle !== e.target) { // && !e.target.classList.contains('dropdown-toggle')){
			this.setState({ show: false })
		}
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
			if (active) className += ' active'

			if (Tag === 'a' && !item.href) rest.href = '#'
			// if(Tag === 'button') rest.type='button'

			return <Tag key={`${label}$`} className={className} onClick={(e: any) => this.itemClick(item)} {...rest}>{item.label}</Tag>
		})
	}

	render() {
		const { show, mounted, item } = this.state
		let classNames = [(this.props.split ? 'btn-group' : 'dropdown'), this.props.addClass]
		let dropdownClassNames = ['dropdown-menu', (this.props.alignRight ? 'dropdown-menu-right' : '')]
		// classNames.push('dropup')
		if (mounted || show) {
			classNames.push('show')
			dropdownClassNames.push('show')
		}
		return (
			<div className={this.props.className || generateClassNames(classNames)}>
				{this.props.toggle && this.props.toggle(this.dropdownRef, this.toggle, item)}
				<Spring
					force
					native
					config={{ ...config.stiff, precision: 0.1 }}
					// immediate={show}
					// config={{ tension: 200, friction: 100, precision: 1 }}
					from={{ height: 0, opacity: 0 }}
					to={{
						height: show ? 'auto' : 0,
						opacity: show ? 1 : 0,
						// transform: show ? 'translate3d(0,0,0)' : 'translate3d(0,10px,0)',
					}}
				>
					{(styleProps) => (
						<animated.div className={generateClassNames(dropdownClassNames)} style={{ pointerEvents: show? 'auto':'none' ,...styleProps }} ref={(c: any) => this.dropMenu = c}>
							{this.props.items && this.renderItems(this.props.items)}
							{this.props.children}
							{this.props.itemsAfter && this.renderItems(this.props.itemsAfter)}
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