import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

const schema = z.object({
	account: z.string().email('introduce a valid email'),
	pwd: z.string('invalid pwd'),
})

const validator = createValidator(schema)

export default validator
