import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import InvitationService from '../../../service/Invitation.service'

export const useUpdateInvitationRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: { groupId: string; account: string; newRole: string }) =>
			InvitationService.UpdateRole(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.INVITATIONS(variables.groupId),
			})
		},
	})
}
