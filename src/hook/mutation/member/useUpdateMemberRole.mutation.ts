import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import MemberService from '../../../service/Member.service'

export const useUpdateMemberRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { groupId: string; account: string; newRole: string }) =>
			MemberService.UpdateRole(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: MEMBER_KEYS.LIST(variables.groupId),
			})
		},
	})
}
