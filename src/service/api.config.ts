import type { SuccessResponse } from '../interface/Response'

const BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

export const api = async ({
	endpoint,
	options,
}: {
	endpoint: string
	options: RequestInit
}): Promise<SuccessResponse> => {
	const config: RequestInit = {
		...(options ?? {}),
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, config)

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}))
		throw {
			msg: errorData.msg,
			description: errorData.description,
		}
	}

	return response.json()
}
