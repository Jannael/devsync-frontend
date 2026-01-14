import config from '../../../../config/config'
import createModel, {
	createGetModel,
} from '../../../../utils/helpers/createModel'

const api = `${config.host}/user/v1`

const model = {
	get: createGetModel(api, '/get'),
	create: createModel(
		{
			fullName: '',
			account: '',
			pwd: '',
			nickName: '',
		},
		api,
		'/create',
		'POST',
	),
	update: createModel(
		{
			fullName: '' as string | undefined,
			nickName: '' as string | undefined,
		},
		api,
		'/update',
		'PUT',
	),
	delete: createModel({}, api, '/delete', 'DELETE'),
	updateAccount: createModel({}, api, '/update/account', 'PATCH'),
	updatePassword: createModel({}, api, '/update/password', 'PATCH'),
	getInvitation: createGetModel(api, '/get/invitation'),
	createInvitation: createModel(
		{
			account: '',
			role: '',
			_id: '',
		},
		api,
		'/create/invitation',
		'POST',
	),
	acceptInvitation: createModel({ _id: '' }, api, '/accept/invitation', 'POST'),
	rejectInvitation: createModel(
		{ _id: '' },
		api,
		'/reject/invitation',
		'DELETE',
	),
	getGroup: createGetModel(api, '/get/group'),
	deleteGroup: createModel(
		{ _id: 'group._id' },
		api,
		'/delete/group',
		'DELETE',
	),
	addGroup: createModel({ _id: '' }, api, '/add/group', 'POST'),
}

export default model
