function createModel<T extends Record<string, any>>(
	_initialProps: T,
	api: string,
	endpoint: string,
	method: 'POST' | 'DELETE' | 'PATCH' | 'PUT',
) {
	return async (data: T) => {
		try {
			const request = await fetch(`${api}${endpoint}`, {
				method,
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(data),
			})

			const response = await request.json()

			if (!request.ok || response.success === false) {
				throw {
					msg: response.msg || 'Something went wrong please try again',
					description: response.description || 'Something went wrong',
				}
			}

			return response
		} catch (e) {
			console.error('Model Error:', e)
			throw e
		}
	}
}

export function createGetModel(api: string, endpoint: string) {
	return async () => {
		try {
			const request = await fetch(`${api}${endpoint}`, {
				credentials: 'include',
			})

			const response = await request.json()

			if (!request.ok || response.success === false) {
				throw {
					msg: response.msg || 'Something went wrong please try again',
					description: response.description || 'Something went wrong',
				}
			}

			return response
		} catch (e) {
			console.error('Model Error:', e)
			throw e
		}
	}
}

export default createModel
