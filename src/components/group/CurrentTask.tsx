import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useGetTask from '../../hooks/task/useGetTask'
import useUpdateTask from '../../hooks/task/useUpdateTask'
import { Edit } from '../../icons'
import EditableFeatures from '../EditableFeatures'
import Button from '../ui/Button'
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
	const [features, setFeatures] = useState<string[] | undefined>(
		currentTask.data?.feature ?? [],
	)

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
				<div className='w-7/10 h-full p-3 relative'>
					<SyntaxHighlighter
						customStyle={{
							height: '100%',
						}}
						language='javascript'
						style={dracula}
					>
						{currentTask.data?.code?.content}
					</SyntaxHighlighter>
					<Button className='absolute right-0 bottom-0 mr-5 mb-3.5'>
						<Edit />
					</Button>
				</div>
			</div>
		</section>
	)
}

export default CurrentTask
