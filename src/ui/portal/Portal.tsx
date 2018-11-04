import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import { isBrowser } from '../_utils'

interface Props {
	node?: Element
	nodeId?: string
}

export class Portal extends Component<Props>{
	private defaultNode: any

	componentWillUnmount() {
		if (this.defaultNode) {
			document.body.removeChild(this.defaultNode)
		}
		this.defaultNode = null
	}

	render() {
		if (!isBrowser()) return null

		if (!this.props.node && !this.defaultNode) {
			if(this.props.nodeId){
				let elem = document.getElementById(this.props.nodeId)
				if(!elem) {
					elem = document.createElement('div')
					elem.id = this.props.nodeId
					document.body.appendChild(elem)
				}
				this.defaultNode = elem
			}else{
				this.defaultNode = document.createElement('div')
				document.body.appendChild(this.defaultNode)
			}
		}

		// return ReactDOM.createPortal(
		// 	this.props.children,
		// 	this.props.node || this.defaultNode
		// )
	}
}