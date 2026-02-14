import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import AuthService from '../../../service/Auth.service'

export const useLogout = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => AuthService.Logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: AUTH_KEYS.SESSION })
		},
	})
}
