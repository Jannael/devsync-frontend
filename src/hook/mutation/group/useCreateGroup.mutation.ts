import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUP_KEYS } from '../../../constant/GroupKeys.constant'
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
			// Also potentially invalidate user's group list if we had a key for it
		},
	})
}
