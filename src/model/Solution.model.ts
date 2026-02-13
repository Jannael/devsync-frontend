import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/solution/v1'

const SolutionModel = {
	Get: CreateModel<{ _id: string; groupId: string }>({
		method: 'POST',
		endpoint: `${route}/get/`,
	}),
	Create: CreateModel<{
		groupId: string
		data: {
			_id: string
			feature: string
			description: string
			code: string
		}
	}>({
		method: 'POST',
		endpoint: `${route}/create/`,
	}),
	Update: CreateModel<{
		_id: string
		groupId: string
		data: {
			feature?: string
			description?: string
			code?: string
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

export default SolutionModel
