import React, { Component, createRef } from "react"
import { _$ } from "./_utils"

interface Props {
	className?: string,
	children?: any,
	show?: boolean
}

interface State {
	show?: boolean,
	className?: string,
	style?: any
}

export class Collapse extends Component<Props>{
	private element = createRef<HTMLDivElement>()

	componentDidMount(){
		// const elem = _$(this.element.current)
	}

	async componentDidUpdate(prevProps:Props){
		if(this.props.show !== prevProps.show){
			const elem = _$(this.element.current)
			if(elem && this.props.show){
				elem.collapse('show')
			}else if(elem){
				elem.collapse('hide')
			}
		}
	}
	// let containerClassName = props.containerClassName || 'container'
	// let content = <div className={containerClassName}>{props.children}</div>
	// if (props.nocontainer) content = props.children
	render() {
		let classNames = ['collapse', this.props.className]

		if(this.props.show) classNames.push('show')

		return (
			<div ref={this.element} className={classNames.join(' ')}>
				{this.props.children}
			</div>
		)
	}
}

