import { useQuery } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import AuthService from '../../../service/Auth.service'

export const useRequestAccessToken = () => {
	return useQuery({
		queryKey: AUTH_KEYS.SESSION,
		queryFn: () => AuthService.RequestAccessToken(),
	})
}
