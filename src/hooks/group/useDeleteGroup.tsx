import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import GroupModel from '../../service/api/models/group/model'

function useDeleteGroup(onSuccess: () => void) {
	const deleteGroup = useMutation({
		mutationFn: GroupModel.delete,
		onSuccess,
	})
	if (deleteGroup.isError) toast.error(deleteGroup.error.message)
	return { deleteGroup }
}

export default useDeleteGroup
