import z from 'zod'

const codeSchema = z.object({
	language: z.enum(['js'], {
		message: 'code.language must be one of: js',
	}),
	content: z.string('code.content must be str'),
})

const baseSchema = z.object({
	groupId: z.string(),
	user: z
		.array(
			z
				.string('user array must be account[]')
				.email('Invalid account at user array'),
		)
		.refine((arr) => new Set(arr).size === arr.length, {
			message:
				'The user array must contain only unique elements (no duplicates).',
		}),
	name: z.string('name must be a string'),
	code: codeSchema,
	feature: z
		.array(z.string('feature array must be string[]'))
		.refine((arr) => new Set(arr).size === arr.length, {
			message:
				'The feature array must contain only unique elements (no duplicates).',
		}),
	description: z
		.string('description must be a string, and must be < 500 length')
		.max(500),
	isComplete: z.boolean('isComplete must be bool'),
	priority: z.number('Priority must be a number between 0-10').min(0).max(10),
})

const creationSchema = baseSchema.extend({
	isComplete: baseSchema.shape.isComplete.default(false),
	priority: baseSchema.shape.priority.default(0),
	user: baseSchema.shape.user.optional(),
	description: baseSchema.shape.description.optional(),
	code: baseSchema.shape.code.optional(),
	feature: baseSchema.shape.feature.optional(),
})
