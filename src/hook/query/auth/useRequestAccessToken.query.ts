import { useQuery } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useRequestAccessToken = () => {
	const query = useQuery({
		queryKey: AUTH_KEYS.SESSION,
		queryFn: () => AuthService.RequestAccessToken(),
	})

	useShowErrorFromServer({
		isError: query.isError,
		error: query.error,
	})

	return query
}
