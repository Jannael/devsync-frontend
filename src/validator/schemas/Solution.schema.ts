import z from 'zod'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'
import CodeFieldSchema from '../fields/CodeField.schema.ts'
import { ObjectIdSchema } from '../fields/ObjectId.validator.ts'

export const SolutionSchema = z.object({
	groupId: ObjectIdSchema,
	data: z.object({
		_id: ObjectIdSchema,
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
	_id: ObjectIdSchema,
	groupId: ObjectIdSchema,
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
