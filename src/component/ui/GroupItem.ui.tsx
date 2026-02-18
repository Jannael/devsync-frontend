import { DotsVerticalIcon } from '../../Icon'
import useMainStore from '../../store/Main.store'

function GroupItem({
	color,
	id,
	name,
	role,
}: {
	color: string
	id: string
	name: string
	role: string
}) {
	const { setCurrentGroup, setCurrentRole } = useMainStore()

	return (
		<div
			className={`w-full flex items-center justify-between`}
			style={{
				backgroundImage: `linear-gradient(to left, ${color}, var(--color-primary))`,
				borderRadius: '8px',
			}}
		>
			<button
				className='cursor-pointer flex-1 text-left p-3 truncate'
				onClick={() => {
					setCurrentGroup(id)
					setCurrentRole(role)
				}}
				type='button'
			>
				{name}
			</button>
			<button
				className='text-xl bg-main p-2 rounded-full cursor-pointer m-1'
				onClick={() => {
					setCurrentGroup(id)
					setCurrentRole(role)
				}}
				type='button'
			>
				<DotsVerticalIcon />
			</button>
		</div>
	)
}

export default GroupItem
