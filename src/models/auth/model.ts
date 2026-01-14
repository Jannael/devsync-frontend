import config from '../../config/config.ts'
import createModel from '../../utils/helpers/createModel.ts'

const api = `${config.host}/auth/v1`

const model = {
	requestCode: createModel({ account: '' }, api, '/request/code', 'POST'),
	verifyCode: createModel(
		{ account: '', code: null as unknown as number },
		api,
		'/verify/code',
		'POST',
	),
}

export default model
