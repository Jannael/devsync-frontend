import { api } from './api.config.ts'

const route = '/auth/v1'

const AuthService = {
	RequestCode: async ({ account }: { account: string }) => {
		const res = await api({
			endpoint: `${route}/request/code/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ account }),
			},
		})

		return res.success
	},
	VerifyCode: async ({ code }: { code: string }) => {
		const res = await api({
			endpoint: `${route}/verify/code/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ code }),
			},
		})

		return res.success
	},
	RequestAccessToken: async () => {
		const res = await api({
			endpoint: `${route}/request/accessToken/`,
			options: {
				method: 'GET',
			},
		})

		return res.success
	},
	RequestLogin: async ({ account, pwd }: { account: string; pwd: string }) => {
		const res = await api({
			endpoint: `${route}/request/refreshToken/code/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ account, pwd }),
			},
		})

		return res.success
	},
	VerifyLogin: async ({ code }: { code: string }) => {
		const res = await api({
			endpoint: `${route}/request/refreshToken/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ code }),
			},
		})

		return res.success
	},
	RequestChangeAccount: async ({ newAccount }: { newAccount: string }) => {
		const res = await api({
			endpoint: `${route}/account/request/code/`,
			options: {
				method: 'PATCH',
				body: JSON.stringify({ newAccount }),
			},
		})

		return res.success
	},
	VerifyChangeAccount: async ({
		codeCurrentAccount,
		codeNewAccount,
	}: {
		codeCurrentAccount: string
		codeNewAccount: string
	}) => {
		const res = await api({
			endpoint: `${route}/change/account/`,
			options: {
				method: 'PATCH',
				body: JSON.stringify({ codeCurrentAccount, codeNewAccount }),
			},
		})

		return res.success
	},
	ForgotPassword: async ({ account }: { account: string }) => {
		const res = await api({
			endpoint: `${route}/password/request/code/`,
			options: {
				method: 'PATCH',
				body: JSON.stringify({ account }),
			},
		})

		return res.success
	},
	VerifyForgotPassword: async ({
		code,
		newPwd,
	}: {
		code: string
		newPwd: string
	}) => {
		const res = await api({
			endpoint: `${route}/change/password/`,
			options: {
				method: 'PATCH',
				body: JSON.stringify({ code, newPwd }),
			},
		})

		return res.success
	},
	Logout: async () => {
		const res = await api({
			endpoint: `${route}/logout/`,
			options: {
				method: 'POST',
			},
		})

		return res.success
	},
}

export default AuthService
