import type Group from '../interface/Group.d'
import type { GroupInvitationListItem } from '../interface/Invitation.d'
import type { Member } from '../interface/Member'
import { api } from './api.config.ts'

const route = '/group/v1'

const GroupService = {
	Get: async ({ groupId }: { groupId: string }): Promise<Group> => {
		const res = await api({
			endpoint: `${route}/get/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		const group: Group = {
			_id: res.data?._id,
			name: res.data?.name,
			color: res.data?.color,
			repository: res.data?.repository,
		}

		return group
	},
	GetInvitation: async ({
		groupId,
	}: {
		groupId: string
	}): Promise<GroupInvitationListItem[]> => {
		const res = await api({
			endpoint: `${route}/get/invitation/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		const invitations: GroupInvitationListItem[] =
			res.data?.map((invitation: GroupInvitationListItem) => {
				return {
					groupId: invitation.groupId,
					account: invitation.account,
					role: invitation.role,
				}
			}) ?? []

		return invitations
	},
	Create: async ({
		data,
	}: {
		data: {
			name: string
			color: string
			repository?: string | null
		}
	}): Promise<Group> => {
		const res = await api({
			endpoint: `${route}/create/`,
			options: {
				method: 'POST',
				body: JSON.stringify(data),
			},
		})
		const group: Group = {
			_id: res.data?._id,
			name: res.data?.name,
			color: res.data?.color,
			repository: res.data?.repository,
		}

		return group
	},
	Update: async ({
		groupId,
		data,
	}: {
		groupId: string
		data: {
			name?: string
			color?: string
			repository?: string | null
		}
	}) => {
		const res = await api({
			endpoint: `${route}/update/`,
			options: {
				method: 'PUT',
				body: JSON.stringify({ groupId, ...data }),
			},
		})

		return res.success
	},
	Delete: async ({ groupId }: { groupId: string }) => {
		const res = await api({
			endpoint: `${route}/delete/`,
			options: {
				method: 'DELETE',
				body: JSON.stringify({ groupId }),
			},
		})

		return res.success
	},
	Join: async ({ groupId }: { groupId: string }): Promise<Member> => {
		const res = await api({
			endpoint: `${route}/join/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		const member: Member = {
			groupId: res.data?.groupId,
			account: res.data?.account,
			role: res.data?.role,
		}

		return member
	},
	Quit: async ({ groupId }: { groupId: string }) => {
		const res = await api({
			endpoint: `${route}/quit/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		return res.success
	},
}

export default GroupService
