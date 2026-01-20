import z from 'zod'
import createValidator from '../utils/helpers/createValidator'
import passwordSchema from './pwdSchema'

const schema = z.object({
	fullName: z
		.string('fullName is required')
		.min(1, { message: 'fullName is required' })
		.max(255, { message: 'fullName must be at most 255 characters' }),
	pwd: passwordSchema,
	nickName: z
		.string('nickname is required')
		.min(1, { message: 'nickName is required' })
		.max(255, { message: 'nickName must be at most 255 characters' }),
})

const validator = createValidator(schema)

export default validator
