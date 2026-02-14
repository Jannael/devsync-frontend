import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import MemberService from '../../../service/Member.service'

export const useRemoveMember = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { groupId: string; account: string }) =>
			MemberService.Remove(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: MEMBER_KEYS.LIST(variables.groupId),
			})
			// Cross-service invalidation to be safe about the current user's groups
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
		},
	})
}
