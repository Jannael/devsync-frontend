import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/task/v1'

const TaskModel = {
	Get: CreateModel<{ _id: string; groupId: string }>({
		method: 'POST',
		endpoint: `${route}/get/`,
	}),
	List: CreateModel<{ groupId: string; page: number }>({
		method: 'POST',
		endpoint: `${route}/list/`,
	}),
	Create: CreateModel<{
		groupId: string
		data: {
			name: string
			description: string
			user?: string[] | null
			feature?: string[] | null
			priority?: string | null
			isComplete?: boolean
			code?: {
				language: string
				content: string
			} | null
		}
	}>({
		method: 'POST',
		endpoint: `${route}/create/`,
	}),
	Update: CreateModel<{
		_id: string
		groupId: string
		data: {
			name?: string
			description?: string
			user?: string[]
			feature?: string[]
			priority?: string
			isComplete?: boolean
			code?: {
				language?: string
				content?: string
			}
		}
	}>({
		method: 'PUT',
		endpoint: `${route}/update/`,
	}),
	Delete: CreateModel<{ _id: string; groupId: string }>({
		method: 'DELETE',
		endpoint: `${route}/delete/`,
	}),
}

export default TaskModel
