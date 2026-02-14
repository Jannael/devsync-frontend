import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import InvitationService from '../../../service/Invitation.service'

export const useRejectInvitation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { groupId: string }) => InvitationService.Reject(args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.INVITATIONS })
		},
	})
}
