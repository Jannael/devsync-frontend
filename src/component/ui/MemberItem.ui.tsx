import { XIcon } from '../../Icon'

function MemberItem({
	member,
	onRemove,
}: {
	member: string
	onRemove: (member: string) => void
}) {
	return (
		<li className='border-b border-primary/50 rounded-lg px-3 py-2 w-full flex justify-between items-center'>
			<span>{member}</span>
			<button
				className='cursor-pointer'
				onClick={() => onRemove(member)}
				type='button'
			>
				<XIcon />
			</button>
		</li>
	)
}

export default MemberItem
