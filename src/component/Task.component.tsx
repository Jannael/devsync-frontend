import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDeleteSolution } from '../hook/mutation/solution/useDeleteSolution.mutation'
import { useDeleteTask } from '../hook/mutation/task/useDeleteTask.mutation'
import { useGetSolution } from '../hook/query/solution/useGetSolution.query'
import { useGetTask } from '../hook/query/task/useGetTask.query'
import { CheckIcon } from '../Icon'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import Button from './ui/Button.ui'
import Header from './ui/Header.ui'

function Task() {
	const currentTask = useMainStore((state) => state.currentTask)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const setCurrentTask = useMainStore((state) => state.setCurrentTask)

	const isSolution = useTaskStore((state) => state.isSolution)
	const setIsSolution = useTaskStore((state) => state.setIsSolution)
	const setAssignedUser = useTaskStore((state) => state.setAssignedUser)
	const setEdit = useTaskStore((state) => state.setEdit)
	const deleteTaskMutation = useDeleteTask()
	const deleteSolutionMutation = useDeleteSolution()

	const taskQuery = useGetTask({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})
	const solutionQuery = useGetSolution({
		_id: currentTask ?? '',
		groupId: currentGroup ?? '',
	})

	const description = isSolution
		? solutionQuery.data?.description
		: taskQuery.data?.description
	const code = isSolution ? solutionQuery.data?.code : taskQuery.data?.code
	const features = isSolution
		? solutionQuery.data?.feature
		: taskQuery.data?.feature

	if (!currentTask || !currentGroup) {
		return (
			<section className='flex-3 h-full p-3' id='Task'>
				<article
					className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
				>
					{' '}
					Please click a group and a task
				</article>
			</section>
		)
	}

	return (
		<section className='flex-3 h-full p-3' id='Task'>
			<article
				className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg w-full px-3 gap-6 overflow-y-auto'
			>
				<Header className='flex-col md:flex-row gap-4 md:gap-0'>
					<div className='w-full'>
						<h1 className='text-2xl font-bold truncate text-center md:text-left'>
							{taskQuery.data?.name}
						</h1>
						{solutionQuery.data?.user !== undefined && (
							<p className='truncate text-center md:text-left'>
								Solution by: {solutionQuery.data?.user}
							</p>
						)}
					</div>
					<div className='flex flex-wrap md:flex-nowrap gap-2 justify-center w-full md:w-auto'>
						{!!solutionQuery.data && (
							<Button
								block={false}
								className='flex-1 md:flex-none'
								onClick={() => setIsSolution(!isSolution)}
								type='button'
							>
								{isSolution ? 'show Task' : 'show Solution'}
							</Button>
						)}
						<Button
							block={false}
							className='flex-1 md:flex-none'
							onClick={() => {
								setEdit(true)
								setAssignedUser(taskQuery.data?.user ?? [])
							}}
							type='button'
						>
							Edit
						</Button>
						<Button
							block={false}
							className='flex-1 md:flex-none'
							onClick={() => {
								if (isSolution) {
									deleteSolutionMutation.mutate({
										_id: currentTask ?? '',
										groupId: currentGroup ?? '',
									})
									setCurrentTask(null)
								} else {
									deleteTaskMutation.mutate({
										_id: currentTask ?? '',
										groupId: currentGroup ?? '',
									})
									setCurrentTask(null)
								}
							}}
							type='button'
							variant='destructive'
						>
							Delete
						</Button>
					</div>
				</Header>
				<p className='w-full p-3 border border-primary rounded-lg flex-none'>
					{description}
				</p>
				<div className='flex-none lg:flex-1 flex flex-col lg:flex-row w-full gap-3'>
					<ul className='flex-1 border border-primary rounded-lg p-3 min-h-32 max-h-48 lg:max-h-none overflow-y-auto'>
						{features?.map((feature) => (
							<li
								className='flex items-center gap-2 border-b border-primary/30 py-1 px-3 truncate'
								key={feature}
							>
								<span className='text-primary'>
									<CheckIcon />
								</span>
								{feature}
							</li>
						))}
					</ul>
					<div className='flex-2 border border-primary rounded-lg p-3 overflow-hidden flex flex-col'>
						<p className='text-sm text-txt mb-2 uppercase font-bold'>
							{code?.language}
						</p>
						<div className='flex-1 overflow-auto rounded-md'>
							<SyntaxHighlighter
								customStyle={{
									margin: 0,
									padding: '1rem',
									fontSize: '0.875rem',
									height: '100%',
									backgroundColor: '#222',
								}}
								language={code?.language?.toLowerCase() || 'typescript'}
								style={vscDarkPlus}
							>
								{code?.content || ''}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
			</article>
		</section>
	)
}

export default Task
