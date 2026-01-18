import AuthModel from './src/service/api/models/auth/model'

self.addEventListener('message', (e) => {
  if (e.data === 'start') {
		AuthModel.requestAccessToken();

    setInterval(async () => {
      try {
        await AuthModel.requestAccessToken();
      } catch {
        self.postMessage('login');
      }
    }, 60 * 14 * 1000); // 14 minutes because access token is valid for 15 minutes
  }
});