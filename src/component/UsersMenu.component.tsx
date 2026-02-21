import useUsersMenu from '../hook/component/useUsersMenu.hook'
import Button from './ui/Button.ui'
import MemberItem from './ui/MemberItem.ui'
import Select from './ui/Select.ui'

// the goal of this component its to show the users with access to the task or solution
// and update the global state assignedUsers to create or update the task or solution
// this means the component must show the input when:
// edit a solution (current assigned users: from the task)
// edit a task (current assigned users: from the task)
// create a task (local state assigned users)
// and only must show the members (no input and assignedUsers update):
// create a solution (current assigned users: from the task)

function UsersMenu() {
	const {
		selectRef,
		membersData: membersAccounts,
		showInput,
		members,
		handleAddMember,
		onRemoveMember,
	} = useUsersMenu()

	const selectItems = membersAccounts?.map((member) => (
		<option key={member.groupId} value={member.account}>
			{member.account}
		</option>
	))

	const memberItems = members.map((member) => (
		<MemberItem key={member} member={member} onRemove={onRemoveMember} />
	))

	return (
		<section className='flex-1 h-full p-3' id='Tasks'>
			<article
				className='h-full bg-main flex flex-col items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
			>
				<header className='flex justify-between items-center w-full px-3 border-b border-primary pb-3 flex-col gap-5'>
					<div className='w-full'>
						<h2 className='text-2xl font-bold'>Users with access</h2>
					</div>
					{showInput && (
						<div className='w-full flex flex-col gap-3'>
							<Select id='user' onChange={() => {}} ref={selectRef} value=''>
								{selectItems}
							</Select>
							<Button block={false} onClick={handleAddMember} type='button'>
								Add
							</Button>
						</div>
					)}
				</header>
				<ul className='w-full flex flex-col gap-2 text-center'>
					{memberItems?.length && memberItems?.length > 0 ? (
						memberItems
					) : (
						<li>No members</li>
					)}
				</ul>
			</article>
		</section>
	)
}

export default UsersMenu
