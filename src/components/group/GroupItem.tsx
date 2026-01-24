import { DotsVertical } from '../../icons'

export function GroupItem({
	name,
	color,
	onClick,
	onMenuClick,
}: {
	name: string
	color: string
	onClick: () => void
	onMenuClick: () => void
}) {
	return (
		<div
			className='
				flex-1
				min-w-2xs h-24
				bg-contrast
				rounded-2xl
				shadow-sm shadow-contrast
				relative
			'
		>
			<button
				className='
					flex flex-col
					min-w-2xs h-24 w-full
					cursor-pointer
				'
				onClick={onClick}
				type='button'
			>
				<div
					className='
						w-full h-14
						rounded-tl-2xl rounded-tr-2xl
					'
					style={{ background: color }}
				></div>
				<div
					className='
						flex-1
						p-1
						text-primary text-xl font-main
					'
				>
					<p>{name}</p>
				</div>
			</button>
			{/* Vertical dots */}
			<button
				className='
					p-1 m-1
					border-contrast border-2 rounded-xl
					cursor-pointer
					absolute left-0 top-0
					bg-primary
				'
				onClick={onMenuClick}
				type='button'
			>
				<DotsVertical />
			</button>
		</div>
	)
}

export default GroupItem
