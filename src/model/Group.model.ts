import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/group/v1'

const GroupModel = {
	Get: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/get/`,
	}),
	GetInvitation: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/get/invitation/`,
	}),
	Create: CreateModel<{
		data: {
			name: string
			color: string
			repository?: string | null
		}
	}>({
		method: 'POST',
		endpoint: `${route}/create/`,
	}),
	Update: CreateModel<{
		groupId: string
		data: {
			name?: string
			color?: string
			repository?: string | null
		}
	}>({
		method: 'PUT',
		endpoint: `${route}/update/`,
	}),
	Delete: CreateModel<{ groupId: string }>({
		method: 'DELETE',
		endpoint: `${route}/delete/`,
	}),
	Join: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/join/`,
	}),
	Quit: CreateModel<{ groupId: string }>({
		method: 'POST',
		endpoint: `${route}/quit/`,
	}),
}

export default GroupModel
