import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import { _$, isBrowser, generateClassNames, colorClasses, delay } from '../_utils'
import { DropdownToggle } from './DropdownToggle'
import { sizeClasses } from '../_utils/sizeClasses'
import { useSpring, animated, config } from 'react-spring'

type DropdownItem = {
  label: any, value?: any, header?: boolean | 'h5' | 'h6',
  divider?: boolean, disabled?: boolean, active?: boolean, href?: string
}

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
  item?: DropdownItem
  items?: DropdownItem[]
  itemsTag?: 'a' | 'button'
  itemsAfter?: DropdownItem[]
  itemClick?: (item: any) => void
  handleChange?: (e: any, name: any, value: any, item: any) => void
  children?: any
  split?: boolean
  alignRight?: boolean
}

function renderDropdownItems(items: DropdownItem[], activeItem: DropdownItem | any, activeValue: any, callbackFunction: any) {
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
      (typeof item.value !== 'undefined' && activeValue === item.value) ||
      (activeItem && activeItem.label === item.label)
    ) className += ' active'

    if (Tag === 'a' && !item.href) rest.href = '#'
    // if(Tag === 'button') rest.type='button'
    return (
      <Tag key={`${label}$`}
        className={className}
        onClick={(e: any) => callbackFunction(e, item)}
        {...rest}
      >
        {item.label}
      </Tag>
    )
  })
}

export const Dropdown = memo((props: Props) => {
  const { show, item, name, itemClick, handleChange, alignRight, className, addClass,
    toggle, toggleColor, toggleSize, split, items, children, itemsAfter, value } = props

  const dropMenuRef = useRef<HTMLDivElement>()
  const [isShown, setIsShown] = useState(show)
  const [activeItem, setActiveItem] = useState(item)
  const [forceUp, setForceUp] = useState(false)

  const styleProps = useSpring({
    config: config.gentle,
    from: { height: 0, opacity: 0 },
    to: {
      height: isShown ? 'auto' : 0,
      opacity: isShown ? 1 : 0,
    }
  })

  let classNames = [(split ? 'btn-group' : 'dropdown'), addClass]
  let dropdownClassNames = ['dropdown-menu', (alignRight ? 'dropdown-menu-right' : '')]

  if (forceUp) classNames.push('dropup')

  const menuClick = useCallback((e: any) => {
    const dropMenu = dropMenuRef.current
    const target = e.target
    if (dropMenu && target.parentElement !== dropMenu.parentElement && !dropMenu.contains(target)) {
      setIsShown(false)
    }
  }, [])

  const handleForceUp = () => {
    let dropMenu = dropMenuRef.current
    let dropMenuParent = dropMenu && dropMenu.parentElement
    if (dropMenuParent) {
      let offsetBottom = window.innerHeight - dropMenuParent.getBoundingClientRect().bottom
      let height = 100
      if (dropMenu) {
        // height = dropMenu.offsetHeight
        // console.log('dropmenu', offsetBottom > height,  forceUp)
      }
      if (offsetBottom < height) setForceUp(true)
      if (offsetBottom > height) setForceUp(false)
    }
  }

  useEffect(() => {
    handleForceUp()
  },[dropMenuRef])

  useEffect(() => {
    if (document) document.addEventListener('mousedown', menuClick)
    if (window) {
      window.addEventListener('scroll', handleForceUp)
      window.addEventListener('resize', handleForceUp)
    }
    return () => {
      if (document) document.removeEventListener('mousedown', menuClick)
      if (window) {
        window.removeEventListener('scroll', handleForceUp)
        window.removeEventListener('resize', handleForceUp)
      }
    }
  }, [])

  const handleToggle = useCallback(() => {
    setIsShown(!isShown)
  }, [isShown])

  const onItemClick = useCallback(async (e: any, item: DropdownItem, isMouseDown?: boolean) => {
    let value = item.value
    if (!value && typeof value !== 'boolean') value = item.label
    if (itemClick) itemClick(item)
    if (handleChange) handleChange(e, name, value, item)
    setIsShown(false)
    await delay(100)
    setActiveItem(item)
  },[])

  const getValue = () => {
    const { toggleLabel, dynamic, value, items = [] } = props
    let item = activeItem
    if (dynamic || typeof value !== 'undefined') {
      if (!item) {
        item = items.filter((di) => di.value === value || di.label === value)[0] || {}
      }
      return item.label || item.value || toggleLabel
    }
    return toggleLabel
    // dynamic ? (item.label || toggleLabel) : toggleLabel
  }

  return (
    <div className={className || generateClassNames(classNames)}>
      {toggle ?
        toggle(null, handleToggle, activeItem) :
        (
          <DropdownToggle onClick={handleToggle} color={toggleColor} size={toggleSize}>
            {getValue()}
          </DropdownToggle>
        )
      }

      <animated.div
        className={generateClassNames(dropdownClassNames)}
        style={{
          pointerEvents: isShown ? 'auto' : 'none',
          display: isShown ? 'block' : 'none', ...styleProps
        }}
        ref={dropMenuRef as any}
      >
        {items && renderDropdownItems(items, activeItem, value, onItemClick)}
        {children}
        {itemsAfter && renderDropdownItems(itemsAfter, activeItem, value, onItemClick)}
      </animated.div>
    </div>
  )
})



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