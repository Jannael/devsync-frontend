import type Task from '../interface/Task.d'
import type { TaskList } from '../interface/Task.d'
import { api } from './api.config.ts'

const route = '/task/v1'

const TaskService = {
	Get: async ({
		_id,
		groupId,
	}: {
		_id: string
		groupId: string
	}): Promise<Task> => {
		const res = await api({
			endpoint: `${route}/get/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ _id, groupId }),
			},
		})

		const task: Task = {
			_id: res.data?._id,
			groupId: res.data?.groupId,
			user: res.data?.user,
			name: res.data?.name,
			description: res.data?.description,
			feature: res.data?.feature,
			priority: res.data?.priority,
			code: res.data?.code,
			isComplete: res.data?.isComplete,
		}

		return task
	},
	List: async ({
		groupId,
		page,
	}: {
		groupId: string
		page: number
	}): Promise<TaskList> => {
		const res = await api({
			endpoint: `${route}/list/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId, page }),
			},
		})

		// assign from the server its an array of task id so just filter and get then from there
		const assign = res.data?.assign?.map((id: string) => {
			return res.data?.task?.filter(
				(task: TaskList['task'][number]) => task._id === id,
			)
		})

		const taskList: TaskList = {
			task: res.data?.task ?? [],
			assign: assign ?? [],
			metadata: res.data?.metadata,
		}

		return taskList
	},
	Create: async ({
		groupId,
		data,
	}: {
		groupId: string
		data: {
			name: string
			description: string
			user?: string[]
			feature?: string[]
			priority?: number
			code?: {
				language: string
				content: string
			}
			isComplete?: boolean
		}
	}): Promise<Task> => {
		const res = await api({
			endpoint: `${route}/create/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId, data }),
			},
		})

		const task: Task = {
			_id: res.data?._id,
			groupId: res.data?.groupId,
			user: res.data?.user,
			name: res.data?.name,
			description: res.data?.description,
			feature: res.data?.feature,
			priority: res.data?.priority,
			code: res.data?.code,
			isComplete: res.data?.isComplete,
		}

		return task
	},
	Update: async ({
		_id,
		groupId,
		data,
	}: {
		_id: string
		groupId: string
		data: {
			name?: string
			description?: string
			code?: {
				language: string
				content: string
			}
			user?: string[]
			priority?: number
			isComplete?: boolean
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

export default TaskService
