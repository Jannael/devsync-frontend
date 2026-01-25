import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import UserModel from '../../service/api/models/user/model'

function useAddGroup(onSuccess: () => void) {
	const addGroup = useMutation({
		mutationFn: UserModel.addGroup,
		onSuccess,
	})

	if (addGroup.isError) toast.error(addGroup.error.message)
	return { addGroup }
}

export default useAddGroup
