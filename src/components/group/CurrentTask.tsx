import { useSearchParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useGetTask from '../../hooks/task/useGetTask'
import Button from '../ui/Button'
import P from '../ui/P'
import Title from '../ui/Title'
import { FeatureItem } from './FeatureItem'

function CurrentTask({ currentTaskId }: { currentTaskId: string | undefined }) {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const { task: currentTask } = useGetTask({ groupId, currentTaskId })

	return (
		<section className='w-8/10 flex flex-col max-h-dvh h-dvh overflow-y-auto'>
			<article className='w-full h-5/10 flex flex-col p-3'>
				<div className='w-full p-3 flex items-center justify-between'>
					<Title className='mb-4 flex-1'>
						{currentTask.data?.name || 'Task'}
					</Title>
					{currentTask.data?.isComplete ? <Button>Solution</Button> : <Button>Solve</Button>}
				</div>
				<P className='flex-1 border border-contrast rounded-xl p-3'>
					{currentTask.data?.description || 'Description...'}
				</P>
			</article>
			<div className='flex w-full h-5/10 p-3 gap-3'>
				<div className='w-3/10 h-full overflow-y-auto border-r p-3'>
					<header className=''>Features</header>
					<ul className=''>
						{currentTask.data?.feature?.map((feature: string) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</div>

				<div className='w-7/10 h-full p-3'>
					<SyntaxHighlighter
						customStyle={{
							height: '100%',
						}}
						language='javascript'
						style={dracula}
					>
						{currentTask.data?.code?.content}
					</SyntaxHighlighter>
				</div>
			</div>
		</section>
	)
}

export default CurrentTask
