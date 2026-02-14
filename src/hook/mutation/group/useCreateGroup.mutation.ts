import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import GroupService from '../../../service/Group.service'

export const useCreateGroup = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: {
			name: string
			color: string
			repository?: string | null
		}) => GroupService.Create({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.GROUPS })
		},
	})
}
