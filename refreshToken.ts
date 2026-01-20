import AuthModel from './src/service/api/models/auth/model'

self.addEventListener('message', async (e) => {
	if (e.data === 'start') {
		try {
			await AuthModel.requestAccessToken()
		} catch {
			self.postMessage('login')
		}

		setInterval(
			async () => {
				try {
					await AuthModel.requestAccessToken()
				} catch {
          console.log('login')
					self.postMessage('login')
				}
			},
			60 * 14 * 1000,
		) // 14 minutes because access token is valid for 15 minutes
	}
})
