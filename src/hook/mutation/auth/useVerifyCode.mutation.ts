import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../service/Auth.service'

export const useVerifyCode = () => {
	return useMutation({
		mutationFn: (data: { code: string }) => AuthService.VerifyCode(data),
	})
}
