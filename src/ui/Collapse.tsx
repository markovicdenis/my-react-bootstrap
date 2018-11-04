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

class Collapse extends Component<Props, State>{
	private element = createRef<HTMLDivElement>()

	constructor(props:Props){
		super(props)
		this.state = {
			show: props.show,
			// className: props.show ? 'collapse show' : 'collapse'
		}
	}

	componentDidMount(){
		// const elem = _$(this.element.current)
	}

	async componentDidUpdate(prevProps:Props){
		if(this.props.show !== prevProps.show && this.props.show !== this.state.show){
			const elem = _$(this.element.current)
			if(elem && this.props.show){
				elem.collapse('show')
				this.setState({show: true})
			}else if(elem){
				elem.collapse('hide')
				this.setState({show: false})
			}
		}
	}
	// let containerClassName = props.containerClassName || 'container'
	// let content = <div className={containerClassName}>{props.children}</div>
	// if (props.nocontainer) content = props.children
	render() {
		let classNames = [this.props.className]

		if(this.state.className) classNames.push(this.state.className)

		return (
			<div ref={this.element} className={classNames.join(' ')} style={this.state.style}>
				{this.props.children}
			</div>
		)
	}
}

export default Collapse 
