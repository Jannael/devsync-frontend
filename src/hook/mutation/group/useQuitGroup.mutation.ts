import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import GroupService from '../../../service/Group.service'

export const useQuitGroup = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { groupId: string }) => GroupService.Quit(data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.DETAIL(variables.groupId),
			})
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
		},
	})
}
