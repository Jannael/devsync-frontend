import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

export const codeSchema = z.object({
	language: z.enum(['js'], {
		message: 'code.language must be one of: js',
	}),
	content: z
		.string('code.content must be str')
		.min(1, { message: 'code is invalid' })
		.max(500, { message: 'code is invalid' }),
})

const baseSchema = z.object({
	groupId: z.string('groupId is required'),
	user: z
		.array(
			z
				.string('user array must be account[]')
				.email('Invalid account at users'),
		)
		.refine((arr) => new Set(arr).size === arr.length, {
			message:
				'The user array must contain only unique elements (no duplicates).',
		}),
	name: z
		.string('name is required')
		.min(1, { message: 'name is required' })
		.max(255, { message: 'name must be at most 255 characters' }),
	code: codeSchema,
	feature: z
		.array(
			z
				.string('feature array must be string[]')
				.min(1, { message: 'feature must be at least 1 character' })
				.max(255, { message: 'feature must be at most 255 characters' }),
		)
		.refine((arr) => new Set(arr).size === arr.length, {
			message:
				'The feature array must contain only unique elements (no duplicates).',
		}),
	description: z
		.string('description must be a string, and must be < 500 length')
		.max(500, { message: 'description must be at most 500 characters' }),
	isComplete: z.boolean(),
	priority: z
		.number()
		.min(0, { message: 'priority must be between 0-10' })
		.max(10, { message: 'priority must be between 0-10' }),
})

const creationSchema = baseSchema.extend({
	isComplete: baseSchema.shape.isComplete.default(false),
	priority: baseSchema.shape.priority.default(0),
	user: baseSchema.shape.user.optional(),
	description: baseSchema.shape.description.optional(),
	code: baseSchema.shape.code.optional(),
	feature: baseSchema.shape.feature.optional(),
})

const validator = createValidator(creationSchema)

export default validator
