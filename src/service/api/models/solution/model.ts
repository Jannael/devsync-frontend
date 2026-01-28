import config from '../../../../config/config'
import createModel from '../../../../utils/helpers/createModel'

const api = `${config.host}/solution/v1`

const model = {
	get: createModel({ groupId: '', taskId: '' }, api, '/get', 'POST'),
	create: createModel(
		{
			groupId: '',
			taskId: '',
			data: {
				feature: [''] as string[] | undefined,
				code: {
					language: '',
					content: '',
				} as { language: string; content: string } | undefined,
				description: '' as string | undefined,
			},
		},
		api,
		'/create',
		'POST',
	),
	update: createModel(
		{
			groupId: '',
			taskId: '',
			data: {
				feature: [''] as string[] | undefined,
				code: {
					language: '',
					content: '',
				} as { language: string; content: string } | undefined,
				description: '' as string | undefined,
			} as Partial<{
				feature: string[] | undefined
				code: { language: string; content: string } | undefined
				description: string | undefined
			}>,
		},
		api,
		'/update',
		'PUT',
	),
	delete: createModel(
		{
			taskId: '',
			groupId: '',
		},
		api,
		'/delete',
		'DELETE',
	),
}

export default model
