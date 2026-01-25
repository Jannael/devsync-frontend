import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import authModel from '../../service/api/models/auth/model'

function useRequestCodeAccount(onSuccess: () => void) {
	const requestCodeAccount = useMutation({
		mutationFn: authModel.accountRequestCode,
		onSuccess,
	})
	if (requestCodeAccount.isError) toast.error(requestCodeAccount.error.message)
	return { requestCodeAccount }
}

export default useRequestCodeAccount
