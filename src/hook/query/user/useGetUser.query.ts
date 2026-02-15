import { useQuery } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import UserService from '../../../service/User.service'

export const useGetUser = () => {
	const query = useQuery({
		queryKey: USER_KEYS.PROFILE,
		queryFn: () => UserService.Get(),
	})

	useShowErrorFromServer({
		isError: query.isError,
		error: query.error,
	})

	return query
}
