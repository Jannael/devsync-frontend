import config from '../../config/config.ts'

const api = `${config.host}/auth/v1`

const model = {
	requestCode: async ({ account }: { account: string }) => {
		try {
			const request = await fetch(`${api}/request/code`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					account,
				}),
			})
			const response = await request.json()
			if (!request.ok && response.body.success === false) return response.msg
			return response
		} catch (e) {
			console.log(e)
		}
	},
}

export default model
