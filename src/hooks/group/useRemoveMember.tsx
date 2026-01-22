import { useMutation } from '@tanstack/react-query'
import GroupModel from '../../service/api/models/group/model'

function useRemoveMember(onSuccess: () => void) {
	const removeMember = useMutation({
		mutationFn: GroupModel.memberRemove,
		onSuccess,
	})
	return { removeMember }
}

export default useRemoveMember