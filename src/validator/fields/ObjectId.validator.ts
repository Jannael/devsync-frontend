import { z } from 'zod'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'

const objectIdRegex = /^[0-9a-fA-F]{24}$/

export const ObjectIdSchema = z
	.string('ObjectId is required')
	.regex(objectIdRegex, 'Invalid ObjectId')

export const ObjectIdValidator = CreateValidator<typeof ObjectIdSchema, string>(
	ObjectIdSchema,
)
