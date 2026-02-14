import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import InvitationService from '../../../service/Invitation.service'

export const useAcceptInvitation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { groupId: string }) => InvitationService.Accept(args),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.INVITATIONS })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
		},
	})
}
