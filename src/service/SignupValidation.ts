import z from 'zod'
import createValidator from '../utils/helpers/createValidator'
import passwordSchema from './pwdSchema'

const schema = z.object({
	fullName: z.string('fullName is required'),
	pwd: passwordSchema,
	nickName: z.string('nickname is required'),
})

const validator = createValidator(schema)

export default validator
