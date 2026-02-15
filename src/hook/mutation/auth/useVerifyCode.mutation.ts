import { useMutation } from '@tanstack/react-query'
import useShowErrorFromServer from '../../../hook/ShowErrorFromServer.handler'
import AuthService from '../../../service/Auth.service'

export const useVerifyCode = () => {
	const mutation = useMutation({
		mutationFn: (data: { code: string }) => AuthService.VerifyCode(data),
	})

	useShowErrorFromServer({
		isError: mutation.isError,
		error: mutation.error,
	})

	return mutation
}
