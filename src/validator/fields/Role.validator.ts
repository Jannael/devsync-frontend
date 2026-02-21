import z from 'zod'
import Roles from '../../constant/Roles.constant'
import CreateValidator from '../../utils/helper/CreateValidator.helper.ts'

export const RoleValidator = CreateValidator(
	z.enum([Roles.developer, Roles.documenter, Roles.techLead], {
		message: 'Invalid role',
	}),
)
