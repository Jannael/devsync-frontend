import { Check, DotsVertical, X } from '../../icons'

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
export default TaskItem
