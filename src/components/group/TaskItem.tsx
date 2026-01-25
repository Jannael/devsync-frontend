import { useState } from 'react'
import { Check, DotsVertical, X } from '../../icons'
import ButtonFloatingMenu from '../ui/ButtonFloatingMenu'
import FloatingMenu from '../ui/FloatingMenu'
import FloatingMenuLi from '../ui/FloatingMenuLi'

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
	const [isOpen, setIsOpen] = useState(false)

	return (
		<li className='flex border-b-2 w-full items-center justify-between'>
			<button
				className='
					flex
					w-9/10
					p-1
					items-center justify-around
					cursor-pointer
					flex-1
				'
				onClick={onClick}
				type='button'
			>
				<i
					className='
						flex-1
						text-2xl
					'
					title='Priority'
				>
					{priority}
				</i>
				<span className='flex-1/2 truncate'>{name}</span>
				<i
					className='flex-1 flex justify-center items-center'
					title='IsComplete'
				>
					{isComplete ? <Check /> : <X />}
				</i>
			</button>
			<div className='w-1/10 relative'>
				{isOpen && (
					<FloatingMenu onOverlayClick={() => setIsOpen(false)}>
						<div className='absolute right-0 -bottom-39 bg-primary p-4 z-10 border border-contrast w-30'>
							<ul className='flex flex-col gap-4'>
								<FloatingMenuLi className='p-2'>Update</FloatingMenuLi>
								<FloatingMenuLi className='border-none hover:bg-transparent'>
									<ButtonFloatingMenu>Delete</ButtonFloatingMenu>
								</FloatingMenuLi>
							</ul>
						</div>
					</FloatingMenu>
				)}
				<button
					className='cursor-pointer z-999999'
					onClick={() => setIsOpen(!isOpen)}
					type='button'
				>
					<DotsVertical />
				</button>
			</div>
		</li>
	)
}
export default TaskItem
