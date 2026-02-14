import type { GroupInvitationListItem } from '../interface/Invitation.d'
import { api } from './api.config.ts'

const route = '/invitation/v1'

const InvitationService = {
	Create: async ({
		groupId,
		data,
	}: {
		groupId: string
		data: { account: string; role: string }
	}): Promise<GroupInvitationListItem> => {
		const res = await api({
			endpoint: `${route}/create/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId, data }),
			},
		})

		const invitation: GroupInvitationListItem = {
			groupId: res.data?.groupId,
			account: res.data?.account,
			role: res.data?.role,
		}

		return invitation
	},
	UpdateRole: async ({
		groupId,
		account,
		newRole,
	}: {
		groupId: string
		account: string
		newRole: string
	}) => {
		const res = await api({
			endpoint: `${route}/update/role/`,
			options: {
				method: 'PATCH',
				body: JSON.stringify({ groupId, account, newRole }),
			},
		})

		return res.success
	},
	Cancel: async ({
		groupId,
		account,
	}: {
		groupId: string
		account: string
	}) => {
		const res = await api({
			endpoint: `${route}/cancel/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId, account }),
			},
		})

		return res.success
	},
	Accept: async ({ groupId }: { groupId: string }) => {
		const res = await api({
			endpoint: `${route}/accept/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		return res.success
	},
	Reject: async ({ groupId }: { groupId: string }) => {
		const res = await api({
			endpoint: `${route}/reject/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		return res.success
	},
}

export default InvitationService
