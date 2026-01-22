import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

export const HexColorSchema = z
	.string('color is required')
	.regex(/^#([A-Fa-f0-9]{3}){1,2}$/, {
		message: 'Invalid color',
	})
	.default('#000000')

const validator = createValidator(z.object({ color: HexColorSchema }))
export default validator
