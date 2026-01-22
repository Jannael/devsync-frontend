import { useMutation } from '@tanstack/react-query'
import GroupModel from '../../service/api/models/group/model'

function useUpdateGroup(onSuccess: () => void) {
	const updateGroup = useMutation({
		mutationFn: GroupModel.update,
		onSuccess,
	})
	return { updateGroup }
}

export default useUpdateGroup
