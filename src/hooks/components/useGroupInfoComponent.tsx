import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import ColorValidator from '../../service/HexColorValidation'
import urlValidator from '../../service/UrlValidator'
import useGetGroup from '../group/useGetGroup'
import useUpdateGroup from '../group/useUpdateGroup'

function useGroupInfoComponent() {
	const [searchParams] = useSearchParams()
	const queryClient = useQueryClient()
	const groupId = searchParams.get('groupId')
	const { group } = useGetGroup({ groupId })
	if (group.isError) toast.error(group.error.message)

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

	if (updateGroup.isError) toast.error(updateGroup.error.message)

	return { data, handleColorUpdate, handleRepositoryUpdate }
}

export default useGroupInfoComponent
