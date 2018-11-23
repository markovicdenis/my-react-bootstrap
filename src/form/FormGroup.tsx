import { basicElement } from '../hoc/basicElement'


export const FormGroup = basicElement<{}, HTMLLabelElement>({ defaultClass:'form-group' })




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