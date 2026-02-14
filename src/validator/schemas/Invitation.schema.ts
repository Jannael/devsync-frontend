import z from 'zod'
import Roles from '../../constant/Roles.constant'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'

const InvitationSchema = z.object({
	groupId: z.string('Group id is required'),
	data: z.object({
		account: z.string('Account is required').email('Invalid account'),
		role: z.enum([Roles.developer, Roles.documenter, Roles.techLead], {
			message: 'Invalid role',
		}),
	}),
})

export const InvitationSchemaPartial = InvitationSchema.partial()
export type InvitationType = z.infer<typeof InvitationSchema>

export const InvitationValidator = CreateValidator<
	typeof InvitationSchema,
	InvitationType
>(InvitationSchema)

export const InvitationPartialValidator = CreateValidator<
	typeof InvitationSchemaPartial,
	Partial<InvitationType>
>(InvitationSchema.partial())
