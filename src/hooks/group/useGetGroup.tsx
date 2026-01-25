import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import GroupModel from '../../service/api/models/group/model'

function useGetGroup({ groupId }: { groupId: string | null }) {
	const group = useQuery({
		queryFn: ({ signal }) => {
			if (groupId === null) return
			return GroupModel.get({ signal, _id: groupId })
		},
		queryKey: [groupId],
		retry: 1,
	})
	if (group.isError) toast.error(group.error.message)
	return { group }
}

export default useGetGroup
