import Roles from '../constant/Roles.constant'
import { useGetMembers } from '../hook/query/member/useGetMembers.query'
import { useGroupStore } from '../store/Group.store'
import useMainStore from '../store/Main.store'
import Button from './ui/Button.ui'
import MemberListItem from './ui/MemberListItem'

function MemberList() {
	const currentGroup = useMainStore((state) => state.currentGroup)
	const currentRole = useMainStore((state) => state.currentRole)
	const { data: members } = useGetMembers(currentGroup ?? '')
	const setShowInviteMemberModal = useGroupStore(
		(state) => state.setShowInviteMemberModal,
	)
	const memberList = members?.map((member) => (
		<MemberListItem
			groupId={currentGroup ?? ''}
			key={member.account}
			member={member}
		/>
	))
	return (
		<section className='flex gap-8 flex-col px-2 md:px-8 border-primary border-2 rounded-xl py-6'>
			<div className='flex justify-between items-center px-2'>
				<h2 className='text-2xl font-bold'>Members</h2>
				{currentRole === Roles.techLead && (
					<Button
						block={false}
						onClick={() => setShowInviteMemberModal(true)}
						type='button'
					>
						Invite member
					</Button>
				)}
			</div>
			{memberList}
		</section>
	)
}

export default MemberList
