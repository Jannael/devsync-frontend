import CreateModel from '../utils/helper/CreateModel.helper.ts'

const route = '/auth/v1'

const AuthModel = {
	RequestCode: CreateModel<{ account: string }>({
		method: 'POST',
		endpoint: `${route}/request/code/`,
	}),
	VerifyCode: CreateModel<{ code: string }>({
		method: 'POST',
		endpoint: `${route}/verify/code/`,
	}),
	RequestAccessToken: CreateModel({
		method: 'GET',
		endpoint: `${route}/request/accessToken/`,
	}),
	RequestLogin: CreateModel<{ account: string; pwd: string }>({
		method: 'POST',
		endpoint: `${route}/request/refreshToken/code/`,
	}),
	VerifyLogin: CreateModel<{ code: string }>({
		method: 'POST',
		endpoint: `${route}/verify/refreshToken/`,
	}),
	RequestChangeAccount: CreateModel<{ nreAccount: string }>({
		method: 'PATCH',
		endpoint: `${route}/account/request/code/`,
	}),
	VerifyChangeAccount: CreateModel<{
		codeCurrentAccount: string
		codeNewAccount: string
	}>({
		method: 'PATCH',
		endpoint: `${route}/change/account/`,
	}),
	ForgotPassword: CreateModel<{ account: string }>({
		method: 'PATCH',
		endpoint: `${route}/password/request/code/`,
	}),
	VerifyForgotPassword: CreateModel<{ code: string; newPwd: string }>({
		method: 'PATCH',
		endpoint: `${route}/change/password/`,
	}),
	Logout: CreateModel({
		method: 'POST',
		endpoint: `${route}/logout/`,
	}),
}

export default AuthModel
