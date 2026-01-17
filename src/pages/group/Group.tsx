import type { ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Button from '../../components/ui/Button'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import { Check, DotsVertical, X } from '../../icons'

const task = [
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	}
]

const currentTask = {
	_id: '',
	groupId: '',
	user: ['insaneAccount@gmail.com'],
	name: 'Insane task',
	code: {
		language: 'js',
		content: `
function Group() {
	const orderedTask = task.sort((task) => task.priority)

	return (
		<Page className='flex justify-center items-center'>
			<section className='w-2/10 h-dvh flex flex-col'>
				<ul className='size-full flex flex-col gap-2 relative overflow-auto flex-1'>
					{orderedTask.map((task) => {
						return (
							<TaskItem
								isComplete={task.isComplete}
								key={task._id}
								name={task.name}
								priority={task.priority}
							/>
						)
					})}
				</ul>
				<Button className='mt-5'>Create</Button>
			</section>
			<section className='w-8/10 max-h-dvh overflow-auto flex flex-wrap items-center px-20 gap-10'>
				<article className='w-full'>
					<Title>{currentTask.name}</Title>
					<P>{currentTask.description}</P>
				</article>
				<div className='w-3/10 flex flex-col gap-2 border-2 border-contrast p-3'>
					<header className='text-xl border-b-2 pb-4'>Features</header>
					<ul className='max-h-56 overflow-auto'>
						{currentTask.feature.map((feature) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</div>

				<SyntaxHighlighter language='javascript' style={dracula}>
					{currentTask.code.content}
				</SyntaxHighlighter >
			</section>
		</Page>
	)
}`,
	},
	feature: [
		'insane feature',
		'insane feature',
		'insane feature',
		'insane feature',
		'insane feature',
	],
	description:
		// cspell:disable-next-line
		'loremasmdjhasdaksjdjasd asdaks dnask asd, loremasmdjhasdaksjdjasd asdaks dnask asd',
	isComplete: false,
	priority: 0,
}

function Group() {
	const orderedTask = task.sort((task) => task.priority)

	return (
		<Page className='flex justify-center items-center'>
			<section className='w-2/10 h-dvh flex flex-col'>
				<ul className='size-full flex flex-col gap-2 relative overflow-auto flex-1'>
					{orderedTask.map((task) => {
						return (
							<TaskItem
								isComplete={task.isComplete}
								key={task._id}
								name={task.name}
								priority={task.priority}
							/>
						)
					})}
				</ul>
				<Button className='mt-5'>Create</Button>
			</section>
			<section className='w-8/10 max-h-dvh overflow-auto flex flex-wrap items-center px-20 gap-10'>
				<article className='w-full'>
					<Title>{currentTask.name}</Title>
					<P>{currentTask.description}</P>
				</article>
				<div className='w-3/10 flex flex-col gap-2 border-2 border-contrast p-3'>
					<header className='text-xl border-b-2 pb-4'>Features</header>
					<ul className='max-h-56 overflow-auto'>
						{currentTask.feature.map((feature) => {
							return <FeatureItem key={feature}> {feature} </FeatureItem>
						})}
					</ul>
				</div>

				<div className='w-6/10'>
					<SyntaxHighlighter language='javascript' style={dracula}>
						{currentTask.code.content}
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
}: {
	name: string
	priority: number
	isComplete: boolean
}) {
	return (
		<li className='flex items-center w-full justify-around gap-3 border-b-2 p-2'>
			<i
				className='
					flex
					border-2 border-contrast rounded-full
					items-center justify-center
					w-8 h-8
					aspect-square

				'
				title='Priority'
			>
				{priority}
			</i>
			{name}
			<i title='IsComplete'>{isComplete ? <Check /> : <X />}</i>
			<button className='cursor-pointer' type='button'>
				<DotsVertical />
			</button>
		</li>
	)
}

function FeatureItem({ children }: { children: ReactNode }) {
	return <li className='border-b-2 p-3'>{children}</li>
}

export default Group
