import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AUTH_KEYS } from '../../../constant/AuthKeys.constant'
import { USER_KEYS } from '../../../constant/UserKeys.constant'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useVerifyLogin = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (data: { code: string }) => AuthService.VerifyLogin(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: AUTH_KEYS.SESSION })
			queryClient.invalidateQueries({ queryKey: USER_KEYS.ALL })
		},
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
