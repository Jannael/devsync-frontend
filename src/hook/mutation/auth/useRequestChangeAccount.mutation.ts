import { useMutation } from '@tanstack/react-query'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useRequestChangeAccount = () => {
	const mutation = useMutation({
		mutationFn: (data: { newAccount: string }) =>
			AuthService.RequestChangeAccount(data),
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
