import z from 'zod'
import createValidator from '../utils/helpers/createValidator'
import { codeSchema } from './TaskValidation'

const schema = z.object({
	taskId: z.string('taskId is required'),
	groupId: z.string('groupId is required'),
	code: codeSchema.optional(),
	feature: z
		.array(z.string('feature must be valid'))
		.refine((arr) => new Set(arr).size === arr.length, {
			message:
				'The user array must contain only unique elements (no duplicates).',
		})
		.optional(),
	description: z
		.string('Description is required')
		.min(1, { message: 'Description is required' })
		.max(500, { message: 'Description must be at most 500 characters' })
		.optional(),
})

const validator = createValidator(schema)
export default validator
