import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../service/Auth.service'

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: (data: { account: string }) => AuthService.ForgotPassword(data),
	})
}
