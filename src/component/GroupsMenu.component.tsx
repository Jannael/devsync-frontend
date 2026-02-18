import FullLogo from '../assets/FullLogo'
import { ROLES } from '../constant/ROLE.constant'
import { ROUTES } from '../constant/Route.constant'
import { useAcceptInvitation } from '../hook/mutation/invitation/useAcceptInvitation.mutation'
import { useRejectInvitation } from '../hook/mutation/invitation/useRejectInvitation.mutation'
import { useGetUserInvitations } from '../hook/query/user/useGetUserInvitations.query'
import { CheckIcon, SettingsIcon, XIcon } from '../Icon'
import useMainStore from '../store/Main.store'
import GroupList from './GroupList.component'
import Button from './ui/Button.ui'

function GroupsMenu() {
	const { currentGroup, currentRole } = useMainStore()

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
					<a
						className='flex items-center gap-2 text-2xl self-start mb-3'
						href={ROUTES.SETTINGS}
					>
						<div className='size-10 flex items-center justify-center rounded-full'>
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
				</article>
			</article>
		</section>
	)
}

function InvitationList() {
	const { data: invitations } = useGetUserInvitations()

	const invitationItems = invitations?.map((invitation) => (
		<InvitationItem
			groupId={invitation.groupId}
			key={invitation.groupId}
			name={invitation.name}
		/>
	))
	return (
		<article className='w-full flex flex-col items-center justify-center border-primary border-2 rounded-lg pb-4 px-4'>
			<header className='flex justify-between w-full items-center py-4 text-2xl'>
				Invitations
			</header>
			<div className='w-full flex flex-col items-center justify-center gap-2'>
				{invitationItems && invitationItems.length > 0
					? invitationItems
					: 'You do not have any invitations'}
			</div>
		</article>
	)
}

function InvitationItem({ name, groupId }: { name: string; groupId: string }) {
	const AcceptMutation = useAcceptInvitation()
	const RejectMutation = useRejectInvitation()

	const handleAccept = () => {
		AcceptMutation.mutate({ groupId })
	}

	const handleReject = () => {
		RejectMutation.mutate({ groupId })
	}

	return (
		<div className='w-full flex items-center justify-between gap-2'>
			<p className='text-contrast/80 truncate flex-1'>{name}</p>
			<div className='flex items-center gap-2'>
				<button
					className='text-accent cursor-pointer size-8 flex items-center justify-center rounded-full hover:bg-accent/30'
					onClick={handleAccept}
					type='button'
				>
					<CheckIcon />
				</button>
				<button
					className='text-warning cursor-pointer size-8 flex items-center justify-center rounded-full hover:bg-warning/30'
					onClick={handleReject}
					type='button'
				>
					<XIcon />
				</button>
			</div>
		</div>
	)
}

export default GroupsMenu
