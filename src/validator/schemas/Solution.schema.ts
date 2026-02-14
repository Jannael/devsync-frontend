import z from 'zod'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'
import CodeFieldSchema from './CodeField.schema'

export const SolutionSchema = z.object({
	groupId: z.string('Group id is required'),
	data: z.object({
		_id: z.string('task id is required'),
		feature: z
			.array(
				z
					.string('Feature item is required')
					.min(1, 'Feature item is required')
					.max(100, 'Feature item must be at most 100 characters'),
			)
			.nullable(),
		code: CodeFieldSchema,
		description: z
			.string('Description is required')
			.min(1, 'Description is required')
			.max(1000, 'Description must be at most 1000 characters'),
	}),
})

export const SolutionSchemaPartial = z.object({
	_id: z.string('Solution id is required'),
	groupId: z.string('Group id is required'),
	data: SolutionSchema.shape.data.omit({ _id: true }).partial(),
})

export type SolutionType = z.infer<typeof SolutionSchema>

export const SolutionValidator = CreateValidator<
	typeof SolutionSchema,
	SolutionType
>(SolutionSchema)

export const SolutionPartialValidator = CreateValidator<
	typeof SolutionSchemaPartial,
	Partial<SolutionType>
>(SolutionSchemaPartial)
