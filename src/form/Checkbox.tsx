import { basicInput } from '../hoc/basicInput'

export const Checkbox = basicInput<{}, HTMLInputElement>({ defaultClass: 'form-check-input', defaultType: 'checkbox' })