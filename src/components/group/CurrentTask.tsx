import { useSearchParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useGetTask from '../../hooks/task/useGetTask'
import P from '../ui/P'
import Title from '../ui/Title'
import { FeatureItem } from './FeatureItem'

function CurrentTask({ currentTaskId }: { currentTaskId: string | undefined }) {
	const [searchParams] = useSearchParams()
	const groupId = searchParams.get('groupId')

	const { task: currentTask } = useGetTask({ groupId, currentTaskId })

	return (
		<section
			className='
					overflow-auto flex flex-wrap
					w-8/10 max-h-dvh
					px-20
					items-center gap-10
				'
		>
			<article className='w-full'>
				<Title>{currentTask.data?.name}</Title>
				<P>{currentTask.data?.description}</P>
			</article>
			<div
				className='
						flex flex-col
						w-3/10
						p-3
						border-2 border-contrast
						gap-2
					'
			>
				<header className='pb-4 text-xl border-b-2'>Features</header>
				<ul className='overflow-auto max-h-56'>
					{currentTask.data?.feature?.map((feature: string) => {
						return <FeatureItem key={feature}> {feature} </FeatureItem>
					})}
				</ul>
			</div>

			<div className='w-6/10'>
				<SyntaxHighlighter language='javascript' style={dracula}>
					{currentTask.data?.code?.content}
				</SyntaxHighlighter>
			</div>
		</section>
	)
}

export default CurrentTask
