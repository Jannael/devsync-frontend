import FullLogo from '../assets/FullLogo'
import { ROLES } from '../constant/ROLE.constant'
import { ROUTES } from '../constant/Route.constant'
import { SettingsIcon } from '../Icon'
import useMainStore from '../store/Main.store'
import GroupList from './GroupList.component'
import Button from './ui/Button.ui'

function GroupsMenu() {
	const { currentGroup, currentRole } = useMainStore()

	return (
		<div className='flex-1 h-full p-3'>
			<article
				className='flex-1 h-full bg-main flex flex-col justify-between items-center
			border-primary border py-5 rounded-lg px-3 gap-6'
				id='Groups'
			>
				<div className='w-full flex items-center justify-center flex-col gap-6'>
					<FullLogo />
					<div className='flex flex-col w-full'>
						<GroupList />
						{/* invitation list */}
					</div>
				</div>

				<div className='w-full flex flex-col items-center justify-center gap-4'>
					<a
						className='flex items-center gap-2 text-2xl self-start mb-3'
						href={ROUTES.SETTINGS}
					>
						<div className='size-10 flex items-center justify-center rounded-full text-contrast'>
							<SettingsIcon />
						</div>
						Settings
					</a>

					{currentGroup !== null && currentRole === ROLES.TECH_LEAD && (
						<Button block={false} className='text-xl w-full' type='button'>
							Create new task
						</Button>
					)}
					<Button block={false} className='text-xl w-full' type='button'>
						Create new group
					</Button>
				</div>
			</article>
		</div>
	)
}

export default GroupsMenu
