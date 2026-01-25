import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import UserModel from '../../service/api/models/user/model'

function useUser() {
	const { data, isError, error } = useQuery({
		queryKey: ['user'],
		queryFn: UserModel.get,
	})

	if (isError) toast.error(error.message)
	return { data }
}

export default useUser
