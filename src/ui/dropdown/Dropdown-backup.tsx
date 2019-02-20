import React, { Component, createRef } from 'react'
import { _$, isBrowser, generateClassNames } from '../_utils'
import { Button } from '../buttons/Button'
import { DropdownToggle } from './DropdownToggle'

type DropdownItem = { label: any, value?: any, header?: boolean | 'h5' | 'h6', divider?: boolean, disabled?: boolean, active?: boolean, href?: string }

interface Props {
  toggle?: (ref: any, toggle: any, item?: DropdownItem) => any
  toggleComponent?: any
  className?: string
  addClass?: string
  show?: boolean
  items?: DropdownItem[]
  itemsTag?: 'a'|'button'
  itemsAfter?: DropdownItem[]
  itemClick?: (item: any) => void
  children?: any
  split?: boolean
  alignRight?: boolean
}

interface State {
  item: any
  show?: boolean
}

export class Dropdown extends Component<Props, State>{
  private dropdownToggle: any
  private dropdownElement: any

  static defaultProps = {
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      item: {},
      show: props.show
    }
  }

  componentDidMount() {
    if (this.dropdownToggle) {
      this.dropdownElement = _$(this.dropdownToggle)
      this.dropdownElement.dropdown()
    }
  }

  dropdownRef = (item: any) => this.dropdownToggle = item

  toggle = () => {
    if (this.dropdownElement) this.dropdownElement.dropdown('toggle')
  }

  itemClick = (item: DropdownItem) => {
    if (this.props.itemClick) this.props.itemClick(item)
    this.setState({ item })
  }

  renderItems = (items: DropdownItem[]) => {
    if (!isBrowser) return []
    return items.map((item: DropdownItem, index: number) => {
      let Tag: any = 'a'
      let className = 'dropdown-item'
      const {active, disabled, label, divider, header, ...rest} = item
      if (divider) return <div key={`divider${index}`} className="dropdown-divider"></div>
      if (header) {
        Tag = typeof header === 'string' ? header : 'h6'
        return <Tag key={`header${label}`}>{label}</Tag>
      }
      if(disabled) className+= ' disabled'
      if(active) className+= ' active'

      if(Tag === 'a' && !item.href) rest.href = '#'
      // if(Tag === 'button') rest.type='button'

      return <Tag key={`${label}$`} className={className} onClick={() => this.itemClick(item)} {...rest}>{item.label}</Tag>
    })
  }

  render() {
    let classNames = [(this.props.split ? 'btn-group' : 'dropdown'), this.props.addClass]
    let dropdownClassNames = ['dropdown-menu', (this.props.alignRight ? 'dropdown-menu-right' : '')]
    return (
      <div className={this.props.className || generateClassNames(classNames)}>
        {this.props.toggle && this.props.toggle(this.dropdownRef, this.toggle, this.state.item)}
        <div className={generateClassNames(dropdownClassNames)}>
          {this.props.items && this.renderItems(this.props.items)}
          {this.props.children}
          {this.props.itemsAfter && this.renderItems(this.props.itemsAfter)}
        </div>
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