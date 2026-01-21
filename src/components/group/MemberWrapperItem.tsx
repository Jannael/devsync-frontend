import { CircleMinus } from '../../icons'

export function MemberItem({
	account,
	memberRole,
	onDelete,
}: {
	account: string
	memberRole: string
	onDelete: () => void
}) {
	return (
		<div className='flex justify-around items-center gap-3'>
			<p className='flex-3/5 border-r-2 truncate'>{account}</p>
			<p className='flex-1/5 text-center'>{memberRole}</p>
			<button
				className='
					flex-1/5 flex
					border-l-2
					cursor-pointer
					justify-center items-center
				'
				onClick={onDelete}
				type='button'
			>
				<CircleMinus />
			</button>
		</div>
	)
}
