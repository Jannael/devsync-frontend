import { useMutation } from '@tanstack/react-query'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useForgotPassword = () => {
	const mutation = useMutation({
		mutationFn: (data: { account: string }) => AuthService.ForgotPassword(data),
	})
	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})
	return mutation
}
