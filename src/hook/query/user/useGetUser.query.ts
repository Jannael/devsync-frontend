import { useQuery } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import UserService from '../../../service/User.service'

export const useGetUser = () => {
	return useQuery({
		queryKey: USER_KEYS.PROFILE,
		queryFn: () => UserService.Get(),
	})
}
