import { X } from '../../icons'

function GroupInfoTechLeadItem({
	account,
	fullName,
	onDelete,
	edit,
}: {
	account: string
	fullName: string
	onDelete?: () => void
	edit?: boolean
}) {
	return (
		<li
			className='
				flex
				p-2
				border-b-2
				items-center justify-around
			'
		>
			<p className='w-1/3 min-w-16 pr-2 border-r-2 truncate'>{fullName}</p>
			<p className={`w-1/3 min-w-16 pr-2 ${edit && 'border-r-2'} truncate flex-1 text-center`}>{account}</p>
			{edit && (
				<button
					className='
					text-red-500
					border-red-500 border-2
					cursor-pointer
				'
					onClick={onDelete}
					type='button'
				>
					<X />
				</button>
			)}
		</li>
	)
}

export default GroupInfoTechLeadItem
