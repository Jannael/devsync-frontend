import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import InvitationService from '../../../service/Invitation.service'

export const useAcceptInvitation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: { groupId: string }) => InvitationService.Accept(args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.INVITATIONS })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
