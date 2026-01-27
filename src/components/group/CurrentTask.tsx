import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useGetTask from '../../hooks/task/useGetTask'
import useUpdateTask from '../../hooks/task/useUpdateTask'
import EditableCode from '../EditableCode'
import EditableFeatures from '../EditableFeatures'
import EditableP from '../ui/EditableP'
import EditableTitle from './EditableTitle'

function CurrentTask({ currentTaskId }: { currentTaskId: string | undefined }) {
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

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<EditableTitle
					handleUpdateTitle={handleUpdateTitle}
					isComplete={currentTask.data?.isComplete}
					name={currentTask.data?.name}
					setUpdateTitle={setUpdateTitle}
					updateTitle={updateTitle}
				/>
				<EditableP
					description={currentTask.data?.description}
					handleUpdateDescription={handleUpdateDescription}
					setUpdateDescription={setUpdateDescription}
					updateDescription={updateDescription}
				/>
			</article>
			<div className='flex w-full h-5/10 p-3 gap-3'>
				<EditableFeatures
					features={features}
					handleUpdateFeatures={handleUpdateFeatures}
					setFeatures={setFeatures}
					setUpdateFeatures={setUpdateFeatures}
					updateFeatures={updateFeatures}
				/>
				<EditableCode
					content={currentTask.data?.code?.content}
					handleUpdateCode={handleUpdateCode}
					setUpdateCode={setUpdateCode}					
					updateCode={updateCode}
				/>
			</div>
		</section>
	)
}

export default CurrentTask
