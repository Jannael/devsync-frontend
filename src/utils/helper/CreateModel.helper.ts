interface Props {
	endpoint: string
	method: 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET'
}

function CreateModel<T>({ method, endpoint }: Props) {
	return async (data: T & { signal?: AbortSignal }) => {
		try {
			const request = await fetch(endpoint, {
				method,
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(data),
				signal: data.signal,
			})

			const response = await request.json()

			if (!request.ok || response.success === false) {
				throw new Error(
					response.description || response.msg || 'Something went wrong',
				)
			}

			return response
		} catch (e) {
			if ((e as Error).message === 'You can not remove the last techLead') {
				;(e as Error).message =
					'You can not remove the last techLead; NOTE: If you are trying to eliminate you account, you must delete your groups first'
			}
			console.error('Model Error:', e)
			throw e
		}
	}
}

export default CreateModel
