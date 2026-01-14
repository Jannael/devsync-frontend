import config from '../../config/config'
import createModel, { createGetModel } from '../../utils/helpers/createModel'

const api = `${config.host}/group/v1`

const model = {
	get: createModel({ _id: '' }, api, '/get', 'POST'),
	create: createModel(
		{
			name: '',
			color: '',
			repository: '' as string | undefined,
			member: [{ account: '', role: '' }] as
				| Array<{ account: string; role: string }>
				| undefined,
			techLead: [''] as string[] | undefined,
		},
		api,
		'/create',
		'POST',
	),
	update: createModel(
		{
			_id: '',
			data: {
				name: '' as string | undefined,
				color: '' as string | undefined,
				repository: '' as string | undefined,
			},
		},
		api,
		'/update',
		'PUT',
	),
	delete: createModel(
		{
			_id: '',
		},
		api,
		'/delete',
		'DELETE',
	),
	memberUpdateRole: createModel(
		{ _id: '', role: '', account: '' },
		api,
		'/member/update/role',
		'PATCH',
	),
  memberRemove: createModel({
    _id: '',
    account: ''
  }, api, '/member/remove', 'DELETE')
}

export default model
