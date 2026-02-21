import { Link } from 'react-router'
import FullLogo from '../assets/FullLogo'
import ROLES from '../constant/Roles.constant'
import { ROUTES } from '../constant/Route.constant'
import { SettingsIcon } from '../Icon'
import useMainStore from '../store/Main.store'
import useTaskStore from '../store/Task.store'
import GroupList from './GroupList.component'
import InvitationList from './InvitationList'
import CreateGroupModal from './modal/CreateGroup.modal'
import JoinGroupModal from './modal/JoinGroup.modal'
import Button from './ui/Button.ui'

function GroupsMenu() {
	const {
		currentGroup,
		currentRole,
		showCreateGroupModal,
		showJoinModal,
		setShowCreateGroupModal,
	} = useMainStore()

	const setCreateTask = useTaskStore((state) => state.setCreate)
	const setCurrentTask = useMainStore((state) => state.setCurrentTask)
	const setIsSolution = useTaskStore((state) => state.setIsSolution)
	const setAssignedUser = useTaskStore((state) => state.setAssignedUser)
	const setIsEdit = useTaskStore((state) => state.setEdit)

	return (
		<section className='flex-1 h-full p-3'>
			<article
				className='flex-1 h-full bg-main flex flex-col justify-between items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
				id='Groups'
			>
				<div className='w-full flex items-center justify-center flex-col gap-6'>
					<FullLogo />
					<div className='flex flex-col w-full gap-4'>
						<GroupList />
						<InvitationList />
					</div>
				</div>

				<article className='w-full flex flex-col items-center justify-center gap-4 text-txt'>
					<Link
						className='flex items-center gap-2 text-2xl self-start mb-3'
						to={ROUTES.SETTINGS}
					>
						<div className='size-10 flex items-center justify-center rounded-full'>
							<SettingsIcon />
						</div>
						Settings
					</Link>

					{currentGroup !== null && currentRole === ROLES.techLead && (
						<Button
							block={false}
							className='text-xl w-full'
							onClick={() => {
								setCreateTask(true)
								setIsEdit(false)
								setIsSolution(false)
								setAssignedUser([])
								setCurrentTask(null)
							}}
							type='button'
						>
							Create new task
						</Button>
					)}

					<Button
						block={false}
						className='text-xl w-full'
						onClick={() => setShowCreateGroupModal(true)}
						type='button'
					>
						Create new group
					</Button>
					{showCreateGroupModal && <CreateGroupModal />}
					{showJoinModal && <JoinGroupModal />}
				</article>
			</article>
		</section>
	)
}

export default GroupsMenu
