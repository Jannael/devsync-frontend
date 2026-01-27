import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useGetTask from '../../hooks/task/useGetTask'
import useUpdateTask from '../../hooks/task/useUpdateTask'
import { Edit } from '../../icons'
import Button from '../ui/Button'
import P from '../ui/P'
import EditableTitle from './EditableTitle'
import { FeatureItem } from './FeatureItem'

function CurrentTask({ currentTaskId }: { currentTaskId: string | undefined }) {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const { task: currentTask } = useGetTask({ groupId, currentTaskId })
	const [updateTitle, setUpdateTitle] = useState(false)
	const { updateTask } = useUpdateTask()

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
				<div className='flex-1 relative'>
					<P className='size-full border border-contrast rounded-xl p-3'>
						{currentTask.data?.description || 'Description...'}
					</P>
					<Button className='absolute right-0 bottom-0 m-3'>
						<Edit />
					</Button>
				</div>
			</article>
			<div className='flex w-full h-5/10 p-3 gap-3'>
				<div className='w-3/10 h-full overflow-y-auto border-r p-3'>
					<header className=' flex justify-between items-center'>
						Features
						<Button>
							<Edit />
						</Button>
					</header>
					<ul className=''>
						{currentTask.data?.feature?.map((feature: string) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</div>

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
