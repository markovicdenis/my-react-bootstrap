import { FormGroupFactory } from './FormGroupFactory'
import { basicInput } from '../hoc/basicInput'

export type Props = {
	name: string,
	// className?: string,
	// invalidFeedback?: any,
	// validFeedback?: any,
	// label?: string,
	text?: boolean,
	isValid?: boolean,
	validate?: boolean,
	placeholder?: string,
	value?: any,
	// help?: any,
	type?: 'text' | 'email',
	// alwaysShow?: boolean,
	onChange: (name: string, value: any) => void
}

type State = {
	value: any
}

export const Input = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-control' })


export const FGInput = FormGroupFactory<Props, State>(Input)



// interface Pirops {
// 	className?: string,
// 	children?: any,
// 	onClick?: any,
// 	tag?: string
// }

// const comkp = (props:Pirops) => {
// 	let Tag = props.tag || 'div'
// 	let className = ['main', props.className].join(' ')
// 	return (
// 		<Tag className={className} onClick={props.onClick}>
// 			{props.children}
// 			<FGInput 
// 		</Tag>
// 	)
// }

// export default comkp