import { getColorClass } from "../colorClasses"

it('returns proper class string', () => {
  const className = getColorClass('secondary', 'btn')
  expect(className).toBe('btn-secondary')
})

it('returns proper class string for alerts', () => {
  const className = getColorClass('danger', 'alert')
  expect(className).toBe('btn-secondary')
})