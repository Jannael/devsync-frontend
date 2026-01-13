import Button from '../components/ui/Button'
import Page from '../components/ui/Page'
import { Check, DotsVertical, X } from '../icons'

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
	},
	{
		_id: '1',
		name: 'insane name',
		priority: 7,
		isComplete: false,
	},
]

function Group() {
	const orderedTask = task.sort((task) => task.priority)

	return (
		<Page className='flex'>
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
			<section className='w-7/10 min-h-dvh'></section>
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

export default Group
