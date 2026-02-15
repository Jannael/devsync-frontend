import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import UserService from '../../../service/User.service'

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data: { fullName: string; nickName?: string; pwd: string }) =>
			UserService.Create({ data }),
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
