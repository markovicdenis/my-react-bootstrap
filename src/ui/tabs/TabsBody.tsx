// import React, { PureComponent, CSSProperties } from 'react'
// import { generateClassNames } from '../_utils'
import { basicElement } from '../../hoc/basicElement'

// interface Props {
// 	onClick?: () => void
// 	children?: any
// 	className?: string
// 	addClass?: string
// 	style?: CSSProperties
// }

// export class TabsBody2 extends PureComponent<Props>{
// 	static defaultProps = {
// 		onClick: () => { }
// 	}

// 	render() {
// 		let classNames: string[] = ['tab-content']
// 		if (this.props.addClass) classNames.push(this.props.addClass)

// 		return (
// 			<div className={this.props.className || generateClassNames(classNames)}
// 				onClick={this.props.onClick}
// 				style={this.props.style}
// 			>
// 				{this.props.children}
// 			</div>
// 		)
// 	}
// }


export const TabsBody = basicElement({ defaultClass: 'tab-content' })