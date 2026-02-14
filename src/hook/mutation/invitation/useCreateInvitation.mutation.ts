import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import InvitationService from '../../../service/Invitation.service'

export const useCreateInvitation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: {
			groupId: string
			data: { account: string; role: string }
		}) => InvitationService.Create(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.INVITATIONS(variables.groupId),
			})
		},
	})
}
