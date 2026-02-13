interface Task {
	_id: string
	groupId: string
	user?: string[] | null
	name: string
	description: string
	feature?: string[] | null
	priority: number
	code?: {
		language: string
		content: string
	} | null
	isComplete: boolean
}

export interface TaskList {
	task: [
		{
			_id: string
			name: string
			priority: number
			user: string[]
			isComplete: boolean
		}
	]
	assign: string[]
}

export default Task
