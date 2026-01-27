import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useGetTask from '../task/useGetTask'
import useUpdateTask from '../task/useUpdateTask'

function useCurrentTaskComponent({
	currentTaskId,
}: {
	currentTaskId: string | undefined
}) {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const { task: currentTask } = useGetTask({ groupId, currentTaskId })
	const { updateTask } = useUpdateTask()

	const [updateTitle, setUpdateTitle] = useState(false)
	const [updateDescription, setUpdateDescription] = useState(false)
	const [updateFeatures, setUpdateFeatures] = useState(false)
	const [updateCode, setUpdateCode] = useState(false)

	const [features, setFeatures] = useState<string[] | undefined>([])

	useEffect(() => {
		setFeatures(currentTask.data?.feature ?? [])
	}, [currentTask.data?.feature])

	const handleUpdateTitle = (val: string) => {
		const title = val
		if (title) {
			updateTask.mutate({
				groupId: groupId || '',
				taskId: currentTaskId || '',
				data: {
					name: title,
				},
			})
			setUpdateTitle(false)
		}
	}

	const handleUpdateDescription = (val: string) => {
		const description = val
		if (description) {
			updateTask.mutate({
				groupId: groupId || '',
				taskId: currentTaskId || '',
				data: {
					description: description,
				},
			})
			setUpdateDescription(false)
		}
	}

	const handleUpdateFeatures = () => {
		updateTask.mutate({
			groupId: groupId || '',
			taskId: currentTaskId || '',
			data: {
				feature: features,
			},
		})
		setUpdateFeatures(false)
	}

	const handleUpdateCode = (val: string) => {
		updateTask.mutate({
			groupId: groupId || '',
			taskId: currentTaskId || '',
			data: {
				code: {
					language: 'js',
					content: val,
				},
			},
		})
		setUpdateCode(false)
	}

	return {
		handleUpdateCode,
		handleUpdateDescription,
		handleUpdateFeatures,
		handleUpdateTitle,
		features,
		setFeatures,
		setUpdateCode,
		setUpdateDescription,
		setUpdateFeatures,
		setUpdateTitle,
		updateCode,
		updateDescription,
		updateFeatures,
		updateTitle,
		isComplete: currentTask.data?.isComplete,
		name: currentTask.data?.name,
		description: currentTask.data?.description,
		code: currentTask.data?.code?.content,
	}
}

export default useCurrentTaskComponent
