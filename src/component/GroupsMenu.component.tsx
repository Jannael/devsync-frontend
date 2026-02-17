import FullLogo from '../assets/FullLogo'
import GroupList from './GroupList.component'

function GroupsMenu() {
	return (
		<div className='flex-1 h-full p-3'>
			<article
				className='flex-1 h-full bg-main flex flex-col items-center 
			border-primary border py-5 rounded-lg px-3 gap-6'
				id='Groups'
			>
				<div className='w-full flex items-center justify-center'>
					<FullLogo />
				</div>
				<GroupList />
			</article>
		</div>
	)
}

export default GroupsMenu
