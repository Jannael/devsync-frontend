import config from '../../config/config'
import createModel from '../../utils/helpers/createModel'

const api = `${config.host}/task/v1`

const model = {
	list: createModel(
		{
			groupId: '',
			pagination: null as unknown as number,
		},
		api,
		'/list',
		'POST',
	),
	get: createModel(
		{
			_id: '',
			groupId: '',
		},
		api,
		'/get',
		'POST',
	),
	update: createModel(
		{
			groupId: '',
			taskId: '',
			data: {
				user: [''] as string[] | undefined, // Optional
				name: '' as string | undefined, // Optional
				code: {
					// Optional
					language: '',
					content: '',
				} as { language: string; content: string } | undefined,
				feature: [''] as string[] | undefined, // Optional
				description: '' as string | undefined, // Optional
				isComplete: null as unknown as boolean, // Optional
				priority: null as unknown as number, // Optional
			},
		},
		api,
		'/update',
		'PUT',
	),
	create: createModel(
		{
			groupId: '',
			user: [''] as string[] | undefined, // Optional
			name: '',
			code: {
				// Optional
				language: '',
				content: '',
			} as { language: string; content: string } | undefined,
			feature: [''] as string[] | undefined, // Optional
			description: '' as string | undefined, // Optional
			isComplete: null as unknown as boolean | undefined, // Default = false
			priority: null as unknown as number | undefined, // Default = 0
		},
		api,
		'/create',
		'POST',
	),
	delete: createModel(
		{
			groupId: '',
			_id: '',
		},
		api,
		'/delete',
		'DELETE',
	),
}

export default model
