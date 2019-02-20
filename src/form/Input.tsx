import { FormGroupFactory } from './FormGroupFactory'
import { basicInput } from '../hoc/basicInput'

export type Props = {
  name: string,
  text?: boolean,
  isValid?: boolean,
  validate?: boolean,
  placeholder?: string,
  value?: any,
  type?: 'text' | 'email',
  onChange: (name: string, value: any) => void
}

type State = {
  value: any
}

export const Input = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-control' })

export const FGInput = FormGroupFactory<Props, State>(Input)
