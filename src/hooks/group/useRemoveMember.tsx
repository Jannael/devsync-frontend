import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import GroupModel from '../../service/api/models/group/model'

function useRemoveMember(onSuccess: () => void) {
	const removeMember = useMutation({
		mutationFn: GroupModel.memberRemove,
		onSuccess,
	})
	if (removeMember.isError) toast.error(removeMember.error.message)
	return { removeMember }
}

export default useRemoveMember
