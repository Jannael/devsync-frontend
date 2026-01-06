import z from 'zod'
import createValidator from '../utils/helpers/createValidator'

const schema = z.object({
	name: z.string('Name is required'),
	color: z.string('color is required').regex(/^#([A-Fa-f0-9]{3}){1,2}$/, {
		message: 'Invalid color',
	}).default('#000000'),
	repository: z.string().optional(),
	member: z.array(
		z.object({
			account: z.string().email('member.account is invalid'),
			role: z.enum(['documenter', 'developer'], {
				message: 'member.role must be valid',
			}),
		}),
	).optional(),
	techLead: z.array(z.string().email('techLeads accounts must be valid')).optional(),
})

const validator = createValidator(schema)

export default validator
