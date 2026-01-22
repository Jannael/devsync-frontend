import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

export const urlValidator = z.string().url('invalid url')

const schema = z.object({
	repository: urlValidator,
})

const validator = createValidator(schema)
export default validator
