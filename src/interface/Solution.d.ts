interface Solution {
	_id: string
	user: string
	groupId: string
	description: string
	feature?: string | null
	code?: {
		language: string
		content: string
	} | null
}

export default Solution
