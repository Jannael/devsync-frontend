import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import GroupService from '../../../service/Group.service'

export const useUpdateGroup = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (args: {
			groupId: string
			data: { name?: string; color?: string; repository?: string | null }
		}) => GroupService.Update(args),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: GROUP_KEYS.DETAIL(variables.groupId),
			})
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
		},
	})
}
