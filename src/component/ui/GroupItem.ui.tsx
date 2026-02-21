import { Link } from 'react-router'
import { ROUTES } from '../../constant/Route.constant'
import { DotsVerticalIcon } from '../../Icon'
import useMainStore from '../../store/Main.store'
import useTaskStore from '../../store/Task.store'

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
	const { setCurrentGroup, setCurrentRole, currentGroup } = useMainStore()
	const setCreate = useTaskStore((state) => state.setCreate)
	const setEdit = useTaskStore((state) => state.setEdit)

	return (
		<div
			className={`w-full flex items-center justify-between border ${currentGroup === id ? 'border-accent' : 'border-transparent'}`}
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
					setCreate(false)
					setEdit(false)
				}}
				type='button'
			>
				{name}
			</button>
			<button
				className='flex items-center justify-center'
				onClick={() => {
					setCurrentGroup(id)
					setCurrentRole(role)
					setCreate(false)
					setEdit(false)
				}}
				type='button'
			>
				<Link
					className='text-xl bg-main p-2 rounded-full cursor-pointer m-1'
					to={ROUTES.GROUP_SETTINGS}
				>
					<DotsVerticalIcon />
				</Link>
			</button>
		</div>
	)
}

export default GroupItem
