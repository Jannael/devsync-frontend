import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import UserService from '../../../service/User.service'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data: {
			nickName?: string
			fullName?: string
			pwd?: string
		}) => UserService.Update({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: USER_KEYS.PROFILE })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
