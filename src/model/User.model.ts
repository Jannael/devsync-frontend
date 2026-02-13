import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/user/v1'

const UserModel = {
	Get: CreateModel({
		method: 'GET',
		endpoint: `${route}/get/`,
	}),
	GetGroups: CreateModel({
		method: 'GET',
		endpoint: `${route}/get/group/`,
	}),
	GetInvitations: CreateModel({
		method: 'GET',
		endpoint: `${route}/get/invitation/`,
	}),
	Create: CreateModel<{
		data: {
			fullName: string
			nickName?: string
			pwd: string
		}
	}>({
		method: 'POST',
		endpoint: `${route}/create/`,
	}),
	Update: CreateModel<{
		data: {
			nickName?: string
			fullName?: string
			pwd?: string
		}
	}>({
		method: 'PUT',
		endpoint: `${route}/update/`,
	}),
	Delete: CreateModel({
		method: 'DELETE',
		endpoint: `${route}/delete/`,
	}),
}

export default UserModel
