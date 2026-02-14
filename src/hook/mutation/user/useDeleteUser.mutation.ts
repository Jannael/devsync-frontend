import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import UserService from '../../../service/User.service'

export const useDeleteUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => UserService.Delete(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.ALL })
			// Logout would typically follow or be triggered
		},
	})
}
