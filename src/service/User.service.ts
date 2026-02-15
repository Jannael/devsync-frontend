import type { UserGroupListItem } from '../interface/Group'
import type { UserInvitationListItem } from '../interface/Invitation.d'
import type User from '../interface/User.d'
import { api } from './api.config.ts'

const route = '/user/v1'

const UserService = {
	Get: async (): Promise<User> => {
		const res = await api({
			endpoint: `${route}/get/`,
			options: {
				method: 'GET',
			},
		})

		const user: User = {
			fullName: res.data?.fullName,
			account: res.data?.account,
			nickName: res.data?.nickName,
		}

		return user
	},
	GetGroups: async (): Promise<UserInvitationListItem[]> => {
		const res = await api({
			endpoint: `${route}/get/group/`,
			options: {
				method: 'GET',
			},
		})

		const groups: UserGroupListItem[] =
			res.data?.map((group: UserGroupListItem) => {
				return {
					groupId: group.groupId,
					role: group.role,
					name: group.name,
					color: group.color,
				}
			}) ?? []

		return groups
	},
	GetInvitations: async (): Promise<UserInvitationListItem[]> => {
		const res = await api({
			endpoint: `${route}/get/invitation/`,
			options: {
				method: 'GET',
			},
		})

		const invitations: UserInvitationListItem[] =
			res.data?.map((invitation: UserInvitationListItem) => {
				return {
					groupId: invitation.groupId,
					role: invitation.role,
					name: invitation.name,
				}
			}) ?? []

		return invitations
	},
	Create: async ({
		data,
	}: {
		data: {
			fullName: string
			nickName?: string
			pwd: string
		}
	}): Promise<User> => {
		const res = await api({
			endpoint: `${route}/create/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ data }),
			},
		})

		const user: User = {
			fullName: res.data?.fullName,
			account: res.data?.account,
			nickName: res.data?.nickName,
		}

		return user
	},
	Update: async ({
		data,
	}: {
		data: {
			nickName?: string
			fullName?: string
			pwd?: string
		}
	}) => {
		const res = await api({
			endpoint: `${route}/update/`,
			options: {
				method: 'PUT',
				body: JSON.stringify({ data }),
			},
		})

		return res.success
	},
	Delete: async () => {
		const res = await api({
			endpoint: `${route}/delete/`,
			options: {
				method: 'DELETE',
			},
		})

		return res.success
	},
}

export default UserService
