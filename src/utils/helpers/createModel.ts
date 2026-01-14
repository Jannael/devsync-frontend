function createModel<T extends Record<string, any>>(
	_initialProps: T,
	api: string,
	endpoint: string,
	method: 'POST' | 'DELETE' | 'PATCH',
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

			if (!request.ok) {
				throw {
					msg: response.msg || 'Something went wrong please try again',
					description: response.description,
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
