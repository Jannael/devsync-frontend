import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import ColorValidator from '../../service/HexColorValidation'
import urlValidator from '../../service/UrlValidator'
import useGetGroup from '../group/useGetGroup'
import useRemoveMember from '../group/useRemoveMember'
import useUpdateGroup from '../group/useUpdateGroup'

function useGroupInfoComponent() {
	const [searchParams] = useSearchParams()
	const queryClient = useQueryClient()
	const groupId = searchParams.get('groupId')
	const { group } = useGetGroup({ groupId })

	const data = group.data?.result
	const { updateGroup } = useUpdateGroup(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})

	const handleColorUpdate = (value: string | undefined) => {
		if (value === '' || value === undefined) return
		const isValid = ColorValidator({ color: value })
		if (typeof isValid === 'string') return toast.error(isValid)

		updateGroup.mutate({
			_id: data?._id,
			data: {
				color: value,
				name: undefined,
				repository: undefined,
			},
		})
	}

	const handleRepositoryUpdate = (value: string | undefined) => {
		if (value === '' || value === undefined) return
		const isValid = urlValidator({ repository: value })
		if (typeof isValid === 'string') return toast.error(isValid)

		updateGroup.mutate({
			_id: data?._id,
			data: {
				repository: value,
				name: undefined,
				color: undefined,
			},
		})
	}

	const { removeMember } = useRemoveMember(() => {
		queryClient.invalidateQueries({ queryKey: [groupId] })
	})

	const handleRemoveMember = (account: string) => {
		if (groupId === null) return

		removeMember.mutate({
			_id: groupId,
			account: account,
		})
	}

	if (group.isError) toast.error(group.error.message)
	if (removeMember.isError) toast.error(removeMember.error.message)
	if (updateGroup.isError) toast.error(updateGroup.error.message)

	return { data, handleColorUpdate, handleRepositoryUpdate, handleRemoveMember }
}

export default useGroupInfoComponent
