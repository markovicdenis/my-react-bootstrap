import { basicInput } from '../hoc/basicInput'

export const Radio = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-check-input', defaultType: 'radio' })