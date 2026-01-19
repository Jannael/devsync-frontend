import { useMutation } from '@tanstack/react-query'
import authModel from '../../service/api/models/auth/model'

function useRequestCodeAccount(onSuccess: () => void) {
	const requestCodeAccount = useMutation({
		mutationFn: authModel.accountRequestCode,
		onSuccess,
	})
	return { requestCodeAccount }
}

export default useRequestCodeAccount
