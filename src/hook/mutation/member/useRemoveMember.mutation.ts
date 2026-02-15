import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import MemberService from '../../../service/Member.service'

export const useRemoveMember = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
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

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
