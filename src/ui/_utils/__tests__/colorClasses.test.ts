import { getColorClass } from "../colorClasses"

it('returns proper class string', () => {
	const className = getColorClass('secondary', 'btn')
	expect(className).toBe('btn-secondary')
})