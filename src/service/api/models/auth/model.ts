import config from '../../../../config/config.ts'
import createModel, { createGetModel } from '../../../../utils/helpers/createModel.ts'

const api = `${config.host}/auth/v1`

const model = {
	requestCode: createModel({ account: '' }, api, '/request/code', 'POST'),
	verifyCode: createModel(
		{ account: '', code: '' },
		api,
		'/verify/code',
		'POST',
	),
	requestRefreshTokenCode: createModel(
		{ account: '', pwd: '' },
		api,
		'/request/refreshToken/code',
		'POST',
	),
	requestRefreshToken: createModel(
		{ code: '' },
		api,
		'/request/refreshToken',
		'POST',
	),
	requestAccessToken: createGetModel(api, '/request/accessToken'),
	accountRequestCode: createModel(
		{ newAccount: '' },
		api,
		'/account/request/code',
		'PATCH',
	),
	accountVerifyCode: createModel(
		{ codeCurrentAccount: '', codeNewAccount: '' },
		api,
		'/account/verify/code',
		'PATCH',
	),
	passwordRequestCode: createModel(
		{ account: '' },
		api,
		'/password/request/code',
		'PATCH',
	),
	passwordVerifyCode: createModel(
		{
			code: null as unknown as number,
			account: '',
			newPwd: '',
		},
		api,
		'/password/verify/code',
		'PATCH',
	),
  requestLogout: createModel({}, api, '/request/logout', 'POST')
}

export default model
