import { useGetUserInvitations } from '../hook/query/user/useGetUserInvitations.query'
import InvitationItem from './ui/InvitationItem.ui'

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

export default InvitationList
