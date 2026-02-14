import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../service/Auth.service'

export const useRequestLogin = () => {
	return useMutation({
		mutationFn: (data: { account: string; pwd: string }) =>
			AuthService.RequestLogin(data),
	})
}
