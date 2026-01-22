import { useMutation } from '@tanstack/react-query'
import UserModel from '../../service/api/models/user/model'

function useRemoveGroup(onSuccess: () => void) {
	const removeGroup = useMutation({
		mutationFn: UserModel.deleteGroup,
		onSuccess,
	})

	return { removeGroup }
}

export default useRemoveGroup
