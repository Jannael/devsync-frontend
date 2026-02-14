import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../service/Auth.service'

export const useRequestChangeAccount = () => {
	return useMutation({
		mutationFn: (data: { newAccount: string }) =>
			AuthService.RequestChangeAccount(data),
	})
}
