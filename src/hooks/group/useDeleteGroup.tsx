import { useMutation } from '@tanstack/react-query'
import GroupModel from '../../service/api/models/group/model'

function useDeleteGroup(onSuccess: () => void) {
	const deleteGroup = useMutation({
		mutationFn: GroupModel.delete,
		onSuccess,
	})
	return { deleteGroup }
}

export default useDeleteGroup