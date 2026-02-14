import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import AuthService from '../../../service/Auth.service'

export const useVerifyLogin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { code: string }) => AuthService.VerifyLogin(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: AUTH_KEYS.SESSION })
		},
	})
}
