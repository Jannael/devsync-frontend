import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import AuthService from '../../../service/Auth.service'

export const useVerifyForgotPassword = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: { code: string; newPwd: string }) =>
			AuthService.VerifyForgotPassword(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: AUTH_KEYS.PASSWORD })
		},
	})
}
