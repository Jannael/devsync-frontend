import { toast } from 'sonner'
import { ROUTES } from '../constant/Route.constant'
import type { SuccessResponse } from '../interface/Response'
import AuthService from './Auth.service'

const BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const onTokenRefreshed = (token: string) => {
	refreshSubscribers.map((callback) => callback(token))
	refreshSubscribers = []
}

export const api = async ({
	endpoint,
	options,
	_retryCount = 0,
}: {
	endpoint: string
	options: RequestInit
	_retryCount?: number
}): Promise<SuccessResponse> => {
	const config: RequestInit = {
		...options,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	}

	const response = await fetch(`${BASE_URL}${endpoint}`, config)

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}))

		if (errorData.msg === 'Access token is invalid' && _retryCount < 3) {
			if (!isRefreshing) {
				isRefreshing = true
				AuthService.RequestAccessToken()
					.then(() => {
						isRefreshing = false
						onTokenRefreshed('ready')
					})
					.catch(() => {
						isRefreshing = false
						window.location.href = ROUTES.LOGIN
					})
			}

			return new Promise((resolve) => {
				refreshSubscribers.push(() => {
					resolve(api({ endpoint, options, _retryCount: _retryCount + 1 }))
				})
			})
		}

		if (errorData.msg === 'Refresh token is invalid') {
			toast.error('Your session has expired. Please login again.')
			window.location.href = ROUTES.LOGIN
		}

		throw new Error(
			`${errorData.msg} ${errorData.description ? `: ${errorData.description}` : ''}`,
		)
	}

	return response.json()
}
