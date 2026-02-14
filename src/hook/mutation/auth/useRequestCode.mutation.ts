import { useMutation } from '@tanstack/react-query'
import AuthService from '../../../service/Auth.service'

export const useRequestCode = () => {
	return useMutation({
		mutationFn: (data: { account: string }) => AuthService.RequestCode(data),
	})
}
