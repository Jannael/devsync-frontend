import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import UserService from '../../../service/User.service'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: {
			nickName?: string
			fullName?: string
			pwd?: string
		}) => UserService.Update({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE })
		},
	})
}
