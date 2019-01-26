import React, { PureComponent, CSSProperties } from 'react'
import { CloseButton } from '../buttons/CloseButton'
import { delay } from '../_utils'
import { generateClassNames } from '../_utils/generateClassNames'
import { colorClasses, getColorClass } from '../_utils/colorClasses'
import { getSizeClass } from '../_utils/sizeClasses';

interface Props {
	onClick?: () => void
	children?: any
	className?: string
	addClass?: string
	grow?: boolean
	visible?: boolean
	hasCloseButton?: boolean
	color?: colorClasses
	size?: 'small'
	style?: CSSProperties

}

interface State {
}

export class Spinner extends PureComponent<Props, State>{


	render() {
		const {addClass, grow, size, color, ...rest} = this.props
		const mainClass = grow ? 'spinner-grow' : 'spinner-border'
		let classNames: any[] = [mainClass, addClass]

		if (size) classNames.push(getSizeClass(size, mainClass))

		if (color) classNames.push(getColorClass(color || 'secondary', 'text'))


		return (
			<div className={this.props.className || generateClassNames(classNames)} role="status" {...rest}>
				<span className="sr-only">Loading...</span>
			</div>
		)
	}
}