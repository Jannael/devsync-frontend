import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import InvitationService from '../../../service/Invitation.service'

export const useRejectInvitation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (args: { groupId: string }) => InvitationService.Reject(args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.INVITATIONS })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
