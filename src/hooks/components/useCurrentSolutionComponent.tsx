import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useDeleteSolution from '../solveTask/useDeleteSolution'

1

import useSolution from '../solveTask/useSolution'
import useUpdateSolution from '../solveTask/useUpdateSolution'

function useCurrentSolutionComponent({
	taskId,
	groupId,
	setShowSolution,
}: {
	taskId: string
	groupId: string
	setShowSolution: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const solution = useSolution({ taskId, groupId })
	const [updateDescription, setUpdateDescription] = useState(false)
	const [features, setFeatures] = useState<string[] | undefined>()
	const [updateFeatures, setUpdateFeatures] = useState(false)
	const [updateCode, setUpdateCode] = useState(false)
	const queryClient = useQueryClient()

	const code = solution.data?.result.code?.content
	const { deleteSolution } = useDeleteSolution(() => {
		queryClient.invalidateQueries({ queryKey: [taskId] })
		setShowSolution(false)
	})
	const { updateSolution } = useUpdateSolution()

	if (solution.isError) {
		setShowSolution(false)
	}

	const handleUpdateDescription = (val: string) => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				description: val,
			},
		})
		setUpdateDescription(false)
	}

	const handleUpdateFeatures = () => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				feature: features,
			},
		})
		setUpdateFeatures(false)
	}

	const handleUpdateCode = (val: string) => {
		updateSolution.mutate({
			taskId,
			groupId,
			data: {
				code: {
					language: 'js',
					content: val,
				},
			},
		})
    setUpdateCode(false)
	}

  const handleDelete = () => {
		deleteSolution.mutate({
			taskId,
			groupId,
		})
	}

	return {
		handleUpdateCode,
		handleUpdateDescription,
		handleUpdateFeatures,
		features,
		setFeatures,
		setUpdateCode,
		setUpdateDescription,
		setUpdateFeatures,
		updateCode,
		updateDescription,
		updateFeatures,
		code,
		handleDelete,
    solution
	}
}

export default useCurrentSolutionComponent
