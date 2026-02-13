import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/member/v1'

const MemberModel = {
	Get: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/get/`,
	}),
	UpdateRole: CreateModel<{
		groupId: string
		account: string
		newRole: 'developer' | 'documenter' | 'techLead'
	}>({
		method: 'PATCH',
		endpoint: `${route}/update/role/`,
	}),
	Remove: CreateModel<{
		groupId: string
		account: string
	}>({
		method: 'DELETE',
		endpoint: `${route}/remove/`,
	}),
}

export default MemberModel
