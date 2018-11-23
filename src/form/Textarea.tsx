import { basicInput } from '../hoc/basicInput'

export const Textarea = basicInput<{rows?: Number}, HTMLTextAreaElement>({ defaultTag: 'textarea', defaultClass: 'form-control' })