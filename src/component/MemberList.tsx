import { useGetMembers } from '../hook/query/member/useGetMembers.query'
import useMainStore from '../store/Main.store'
import MemberListItem from './ui/MemberListItem'

function MemberList() {
	const currentGroup = useMainStore((state) => state.currentGroup)
	const { data: members } = useGetMembers(currentGroup ?? '')
	const memberList = members?.map((member) => (
		<MemberListItem
			groupId={currentGroup ?? ''}
			key={member.account}
			member={member}
		/>
	))
	return <section className='flex flex-col w-full'>{memberList}</section>
}

export default MemberList
