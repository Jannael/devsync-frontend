import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMBER_KEYS } from '../../../constant/MemberKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import MemberService from '../../../service/Member.service'

export const useUpdateMemberRole = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: { groupId: string; account: string; newRole: string }) =>
			MemberService.UpdateRole(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: MEMBER_KEYS.LIST(variables.groupId),
			})
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
