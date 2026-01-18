import { useQuery } from '@tanstack/react-query'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Button from '../../components/ui/Button'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import { Check, DotsVertical, X } from '../../icons'
import queryKeys from '../../queryKeys'
import { routesConst } from '../../routes.constants'
import TaskModel from '../../service/api/models/task/model'

function Group() {
	const [searchParams] = useSearchParams()
	const [currentTaskId, setCurrentTaskId] = useState<string>()
	const [taskPage, setTaskPage] = useState(0)
	const [taskList, setTaskList] = useState<
		{
			_id: string
			name: string
			priority: number
			isComplete: false
		}[]
	>([])

	const currentTask = useQuery({
		queryFn: async () => {
			const groupId = searchParams.get('groupId')
			if (groupId === null) return false
			if (currentTaskId === undefined) return false

			return TaskModel.get({ _id: currentTaskId, groupId: groupId })
		},
		queryKey: [queryKeys.taskDetail(currentTaskId ?? ''), currentTaskId],
		retry: false,
	})

	const taskListQuery = useQuery({
		queryFn: async () => {
			const groupId = searchParams.get('groupId')
			if (groupId === null) return
			const res = await TaskModel.list({
				groupId: groupId,
				pagination: taskPage,
			})
			return res
		},
		queryKey: [
			queryKeys.taskList(searchParams.get('groupId') ?? '', taskPage),
			taskPage,
		],
		retry: false,
	})

	useEffect(() => {
		if (taskListQuery.data?.result.task === undefined) return
		setCurrentTaskId(taskListQuery.data.result.task[0]?._id)

		setTaskList((prev) => [
			...prev,
			...taskListQuery.data.result.task.map(
				(task: {
					_id: string
					name: string
					priority: number
					isComplete: false
				}) => ({
					_id: task._id,
					name: task.name,
					priority: task.priority,
					isComplete: task.isComplete,
				}),
			),
		])
	}, [taskListQuery.data])

	const scrollRef = useRef<HTMLUListElement>(null)

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

			if (scrollTop + clientHeight >= scrollHeight - 5) {
				setTaskPage((prev) => prev + 1)
			}
		}
	}

	return (
		<Page className='flex justify-center items-center'>
			<section className='flex flex-col w-2/10 h-dvh'>
				<ul
					className='
						flex flex-col overflow-auto flex-1
						size-full gap-2 relative
					'
					onScroll={handleScroll}
					ref={scrollRef}
				>
					{taskList?.map(
						(task: {
							_id: string
							name: string
							priority: number
							isComplete: boolean
						}) => {
							return (
								<TaskItem
									isComplete={task.isComplete}
									key={task._id}
									name={task.name}
									onClick={() => {
										setCurrentTaskId(task._id)
									}}
									priority={task.priority}
								/>
							)
						},
					)}
				</ul>
				<Button
					className='mt-5'
					onClick={() => {
						window.location.href = `${routesConst.createTask}?groupId=${searchParams.get('groupId')}`
					}}
				>
					Create
				</Button>
				<Button
					className='mt-5'
					onClick={() => {
						window.location.href = `${routesConst.solveTask}?groupId=${searchParams.get('groupId')}?taskId=${currentTaskId}`
					}}
				>
					Solve
				</Button>
			</section>
			<section
				className='
					overflow-auto flex flex-wrap
					w-8/10 max-h-dvh
					px-20
					items-center gap-10
				'
			>
				<article className='w-full'>
					<Title>{currentTask.data?.result?.name}</Title>
					<P>{currentTask.data?.result?.description}</P>
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
						{currentTask.data?.result?.feature?.map((feature: string) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</div>

				<div className='w-6/10'>
					<SyntaxHighlighter language='javascript' style={dracula}>
						{currentTask.data?.result?.code?.content}
					</SyntaxHighlighter>
				</div>
			</section>
		</Page>
	)
}

function TaskItem({
	name,
	priority,
	isComplete,
	onClick,
}: {
	name: string
	priority: number
	isComplete: boolean
	onClick: () => void
}) {
	return (
		<li className='flex border-b-2'>
			<button
				className='
					flex
					w-full
					p-2
					items-center justify-around gap-3
					cursor-pointer
				'
				onClick={onClick}
				type='button'
			>
				<i
					className='
						flex
						w-8 h-8
						border-2 border-contrast rounded-full
						items-center justify-center aspect-square
					'
					title='Priority'
				>
					{priority}
				</i>
				{name}
				<i title='IsComplete'>{isComplete ? <Check /> : <X />}</i>
			</button>
			<button className='cursor-pointer' type='button'>
				<DotsVertical />
			</button>
		</li>
	)
}

function FeatureItem({ children }: { children: ReactNode }) {
	return <li className='p-3 border-b-2'>{children}</li>
}

export default Group
