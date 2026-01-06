import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

const schema = z.object({
	account: z.string().email('Introduce a valid email'),
})

const validator = createValidator(schema)

export default validator
