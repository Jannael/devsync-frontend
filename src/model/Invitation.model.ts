import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/invitation/v1'

const InvitationModel = {
	Create: CreateModel<{
		groupId: string
		data: {
			account: string
			role: 'developer' | 'documenter' | 'techLead'
		}
	}>({
		method: 'POST',
		endpoint: `${route}/create/`,
	}),
	UpdateRole: CreateModel<{
		groupId: string
		account: string
		newRole: string
	}>({
		method: 'PATCH',
		endpoint: `${route}/update/role/`,
	}),
	Cancel: CreateModel<{
		groupId: string
		account: string
	}>({
		method: 'POST',
		endpoint: `${route}/cancel/`,
	}),
	Accept: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/accept/`,
	}),
	Reject: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/reject/`,
	}),
}

export default InvitationModel
