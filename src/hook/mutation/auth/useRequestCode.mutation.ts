import { useMutation } from '@tanstack/react-query'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useRequestCode = () => {
	const mutation = useMutation({
		mutationFn: (data: { account: string }) => AuthService.RequestCode(data),
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
