import { Toaster } from 'sonner'
import ButtonsScreen from '../components/ButtonsMainScreen'
import GroupContainer from '../components/group/GroupContainer'
import GroupItem from '../components/group/GroupItem'
import InvitationItem from '../components/group/InvitationItem'
import Page from '../components/ui/Page'
import useGetInvitation from '../hooks/user/useGetInvitation'
import useGetUsersGroup from './../hooks/user/useGetUsersGroup'
import { routesConst } from '../routes.constants'

function Main() {
	const { data: groups } = useGetUsersGroup()
	const { data: invitations } = useGetInvitation()

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
			return <InvitationItem key={invitation._id} />
		},
	)

	return (
		<>
			<Page className='p-10'>
				<Toaster />
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
