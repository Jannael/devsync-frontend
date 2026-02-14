import type { Member } from '../interface/Member'
import { api } from './api.config.ts'

const route = '/member/v1'

const MemberService = {
	Get: async ({ groupId }: { groupId: string }): Promise<Member[]> => {
		const res = await api({
			endpoint: `${route}/get/`,
			options: {
				method: 'POST',
				body: JSON.stringify({ groupId }),
			},
		})

		const members: Member[] =
			res.data?.map((member: Member) => {
				return {
					groupId: member.groupId,
					account: member.account,
					role: member.role,
				}
			}) ?? []

		return members
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
	Remove: async ({
		groupId,
		account,
	}: {
		groupId: string
		account: string
	}) => {
		const res = await api({
			endpoint: `${route}/remove/`,
			options: {
				method: 'DELETE',
				body: JSON.stringify({ groupId, account }),
			},
		})

		return res.success
	},
}

export default MemberService
