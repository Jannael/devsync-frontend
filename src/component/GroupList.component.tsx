import { useGetUserGroups } from '../hook/query/user/useGetUserGroups.query'
import Button from './ui/Button.ui'
import GroupItem from './ui/GroupItem.ui'

function GroupList() {
	const { data: groupList } = useGetUserGroups()

	const groupItems = groupList?.map((group) => (
		<GroupItem
			color={group.color}
			id={group.groupId}
			key={group.groupId}
			name={group.name}
			role={group.role}
		/>
	))

	return (
		<div className='w-full flex flex-col items-center justify-center border-primary border-2 rounded-lg pb-4 px-4'>
			<header className='flex justify-between w-full items-center py-4 text-2xl'>
				Groups
				<Button block={false} className='text-xl' type='button'>
					Join
				</Button>
			</header>
			<div className='w-full flex flex-col items-center justify-center gap-2'>
				{groupItems && groupItems.length > 0
					? groupItems
					: 'You do not have any groups'}
			</div>
		</div>
	)
}

export default GroupList
