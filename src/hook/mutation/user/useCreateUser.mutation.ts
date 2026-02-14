import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import UserService from '../../../service/User.service'

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { fullName: string; nickName?: string; pwd: string }) =>
			UserService.Create({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE })
		},
	})
}
