import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import GroupService from '../../../service/Group.service'

export const useJoinGroup = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { groupId: string }) => GroupService.Join(data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.DETAIL(variables.groupId),
			})
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.INVITATIONS })
		},
	})
}
