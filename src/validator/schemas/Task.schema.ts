import { z } from 'zod'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'
import CodeFieldSchema from './CodeField.schema'

export const TaskBaseSchema = z.object({
	groupId: z.string('Group id is required'),
	data: z.object({
		user: z
			.array(z.string('User is required').email('User is invalid'))
			.nullable(),
		name: z
			.string('Name is required')
			.min(1, 'Name is required')
			.max(100, 'Name must be at most 100 characters'),
		code: CodeFieldSchema,
		feature: z
			.array(
				z
					.string('Feature item is required')
					.min(1, 'Feature item is required')
					.max(100, 'Feature item must be at most 100 characters'),
			)
			.nullable(),
		description: z
			.string('Description is required')
			.min(1, 'Description is required')
			.max(1000, 'Description must be at most 1000 characters'),
		isComplete: z.boolean('IsComplete is invalid'),
		priority: z.number('Priority is invalid'),
	}),
})

export const TaskSchema = TaskBaseSchema.extend({
	data: TaskBaseSchema.shape.data.extend({
		isComplete: TaskBaseSchema.shape.data.shape.isComplete.default(false),
		priority: TaskBaseSchema.shape.data.shape.priority.default(0),
	}),
})

export const TaskSchemaUpdate = TaskBaseSchema.extend({
	_id: z.string('Id is required'),
	groupId: z.string('Group id is required'),
	data: TaskBaseSchema.shape.data.optional(),
})
export const TaskSchemaPartial = TaskSchemaUpdate.partial()

export type TaskType = z.infer<typeof TaskSchema>

export const TaskValidator = CreateValidator<typeof TaskSchema, TaskType>(
	TaskSchema,
)

export const TaskPartialValidator = CreateValidator<
	typeof TaskSchemaPartial,
	Partial<TaskType>
>(TaskSchemaPartial)
