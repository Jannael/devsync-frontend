import ButtonsScreen from '../components/ButtonsMainScreen'
import GroupContainer from '../components/group/GroupContainer'
import GroupItem from '../components/group/GroupItem'
import InvitationItem from '../components/group/InvitationItem'
import Page from '../components/ui/Page'
import useAcceptInvitation from '../hooks/user/useAcceptInvitation'
import useGetInvitation from '../hooks/user/useGetInvitation'
import useGetUsersGroup from './../hooks/user/useGetUsersGroup'
import useRejectInvitation from '../hooks/user/useRejectInvitation'
import { routesConst } from '../routes.constants'

function Main() {
	const { data: groups } = useGetUsersGroup()
	const { data: invitations } = useGetInvitation()
	const { acceptInvitation } = useAcceptInvitation()
	const { rejectInvitation } = useRejectInvitation()

	const groupItems = groups?.result?.map(
		(group: { color: string; name: string; _id: string }) => {
			return (
				<GroupItem
					color={group.color}
					key={group._id}
					name={group.name}
					onClick={() => {
						window.location.href = `${routesConst.group}?groupId=${group._id}`
					}}
					onMenuClick={() => {
						window.location.href = `${routesConst.groupInfo}?groupId=${group._id}`
					}}
				/>
			)
		},
	)

	const invitationItems = invitations?.result?.map(
		(invitation: { name: string; _id: string; color: string }) => {
			return (
				<InvitationItem
					color={invitation.color}
					key={invitation._id}
					name={invitation.name}
					onAccept={() => {
						acceptInvitation.mutate({ _id: invitation._id })
					}}
					onReject={() => {
						rejectInvitation.mutate({ _id: invitation._id })
					}}
				/>
			)
		},
	)

	return (
		<>
			<Page className='p-10'>
				<GroupContainer>
					{groupItems}
					{invitationItems}
				</GroupContainer>
			</Page>
			<ButtonsScreen />
		</>
	)
}

export default Main
