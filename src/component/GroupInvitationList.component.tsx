import { useGetGroupInvitations } from '../hook/query/group/useGetGroupInvitations.query'
import useMainStore from '../store/Main.store'
import MemberListItem from './ui/MemberListItem'

function GroupInvitationList() {
	const currentGroup = useMainStore((state) => state.currentGroup)
	const { data: invitations } = useGetGroupInvitations(currentGroup ?? '')

	const invitationList = invitations?.map((invitation) => (
		<MemberListItem
			groupId={currentGroup ?? ''}
			key={invitation.account}
			member={invitation}
			mode='invitation'
		/>
	))

	if (!invitations || invitations.length === 0) return null

	return (
		<section className='flex gap-8 flex-col px-2 md:px-8 border-primary border-2 rounded-xl py-6'>
			<h2 className='text-2xl font-bold'>Pending Invitations</h2>
			<div className='flex flex-col w-full'>{invitationList}</div>
		</section>
	)
}

export default GroupInvitationList
