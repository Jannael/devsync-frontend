import { CircleMinus } from '../../icons'

export function TechLeadItem({
	account,
	onDelete,
}: {
	account: string
	onDelete?: () => void
}) {
	return (
		<div className='flex justify-around items-center'>
			<span className='flex-3 truncate'>{account}</span>
			<button
				className='
					flex-1 flex
					border-l-2
					cursor-pointer
					justify-center
				'
				onClick={onDelete}
				type='button'
			>
				<CircleMinus />
			</button>
		</div>
	)
}
