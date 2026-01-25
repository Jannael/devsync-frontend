import { useQuery } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import ButtonsScreen from '../components/ButtonsMainScreen'
import GroupContainer from '../components/group/GroupContainer'
import GroupItem from '../components/group/GroupItem'
import Page from '../components/ui/Page'
import queryKeys from '../queryKeys'
import { routesConst } from '../routes.constants'
import userModel from './../service/api/models/user/model'

function Main() {
	const { data, isError, error } = useQuery({
		queryFn: userModel.getGroup,
		queryKey: [queryKeys.groupsList],
		retry: 1,
	})

	if (isError) toast.error(error.message)

	const groupItems = data?.result?.map(
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

	return (
		<>
			<Page className='p-10'>
				<Toaster />
				<GroupContainer>{groupItems}</GroupContainer>
			</Page>
			<ButtonsScreen />
		</>
	)
}

export default Main
