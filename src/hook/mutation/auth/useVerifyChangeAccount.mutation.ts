import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import AuthService from '../../../service/Auth.service'

export const useVerifyChangeAccount = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: {
			codeCurrentAccount: string
			codeNewAccount: string
		}) => AuthService.VerifyChangeAccount(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: AUTH_KEYS.ACCOUNT })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.ALL })
		},
	})
}
