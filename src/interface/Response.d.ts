export interface ErrorResponse {
	success: false
	msg: string
	description?: string
	link?: Array<{ rel: string; href: string }>
}

export interface SuccessResponse {
	success: true
	data?: {
		// biome-ignore lint/suspicious: <because it has to be any>
		[key: string]: any
		metadata?: {
			totalItems: number
			totalPages: number
			currentPage: number
			pageSize: number
			nextPageUrl: string | null
			prevPageUrl: string | null
			hasNextPage: boolean
			hasPrevPage: boolean
		}
		// biome-ignore lint/suspicious: <because it has to be any>
	} & any[]
	link?: Array<{ rel: string; href: string }>
}

export type Response = ErrorResponse | SuccessResponse
