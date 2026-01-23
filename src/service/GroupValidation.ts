import z from 'zod'
import { roles } from '../memberRoles'
import createValidator from '../utils/helpers/createValidator'
import { HexColorSchema } from './HexColorValidation'
import { urlValidator } from './UrlValidator'

const schema = z.object({
	name: z.string('Name is required'),
	color: HexColorSchema,
	repository: urlValidator.optional().default('https://github.com'),
	member: z
		.array(
			z.object({
				account: z.string().email('member.account is invalid'),
				role: z.enum([roles.documenter, roles.developer], {
					message: 'member.role must be valid',
				}),
			}),
		)
		.optional(),
	techLead: z
		.array(z.string().email('techLeads accounts must be valid'))
		.optional(),
})

const validator = createValidator(schema)

export default validator
