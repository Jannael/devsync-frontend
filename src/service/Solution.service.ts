import type Solution from '../interface/Solution.d'
import { api } from './api.config.ts'

const route = '/solution/v1'

const SolutionService = {
	Get: async ({
		_id,
		groupId,
	}: {
		_id: string
		groupId: string
	}): Promise<Solution> => {
		const res = await api({
			endpoint: `${route}/get/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ _id, groupId }),
			},
		})

		const solution: Solution = {
			_id: res.data?._id,
			user: res.data?.user,
			groupId: res.data?.groupId,
			description: res.data?.description,
			feature: res.data?.feature,
			code: res.data?.code,
		}

		return solution
	},
	Create: async ({
		groupId,
		data,
	}: {
		groupId: string
		data: {
			_id: string
			description: string
			feature?: string[]
			code?: {
				language: string
				content: string
			}
		}
	}): Promise<Solution> => {
		const res = await api({
			endpoint: `${route}/create/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId, data }),
			},
		})

		const solution: Solution = {
			_id: res.data?._id,
			user: res.data?.user,
			groupId: res.data?.groupId,
			description: res.data?.description,
			feature: res.data?.feature,
			code: res.data?.code,
		}

		return solution
	},
	Update: async ({
		_id,
		groupId,
		data,
	}: {
		_id: string
		groupId: string
		data: {
			feature?: string[]
			description?: string
			code?: {
				language: string
				content: string
			}
		}
	}) => {
		const res = await api({
			endpoint: `${route}/update/`,
			options: {
				method: 'PUT',
				body: JSON.stringify({ _id, groupId, data }),
			},
		})

		return res.success
	},
	Delete: async ({ _id, groupId }: { _id: string; groupId: string }) => {
		const res = await api({
			endpoint: `${route}/delete/`,
			options: {
				method: 'DELETE',
				body: JSON.stringify({ _id, groupId }),
			},
		})

		return res.success
	},
}

export default SolutionService
