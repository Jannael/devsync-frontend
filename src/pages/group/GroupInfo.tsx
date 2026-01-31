import GroupInfoField from '../../components/group/GroupInfoField'
import MemberItem from '../../components/group/GroupInfoMemberItems'
import TechLeadItem from '../../components/group/GroupInfoTechLeadItem'
import { PeopleHeader, PeopleSection } from '../../components/group/People'
import InviteUserModal from '../../components/InviteUserModal'
import Modal from '../../components/Modal'
import Button from '../../components/ui/Button'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useGroupInfoComponent from '../../hooks/components/useGroupInfoComponent'
import useRole from '../../hooks/useRole'

//Features
// 1.change roles
// 2.quit
// 3.add/remove members
// 4.update name, color or repository
// 5.delete group

function GroupInfo() {
	const {
		data,
		handleColorUpdate,
		handleRepositoryUpdate,
		handleRemoveMember,
		handleDeleteGroup,
		handleRemoveGroup,
		handleInviteUser,
		handleUpdateMemberRole,
		isOpen,
		setIsOpen,
		handleNameUpdate,
		groupId,
	} = useGroupInfoComponent()

	const { isTechLead } = useRole({ groupId })

	const techLeadItems = data?.techLead?.map(
		(techLead: { account: string; fullName: string }) => {
			return (
				<TechLeadItem
					account={techLead.account}
					edit={isTechLead}
					fullName={techLead.fullName}
					key={techLead.account}
					onDelete={() => handleRemoveMember(techLead.account)}
				/>
			)
		},
	)

	const memberItems = data?.member?.map(
		(member: { account: string; role: string }) => {
			return (
				<MemberItem
					account={member.account}
					edit={isTechLead}
					key={member.account}
					onDelete={() => handleRemoveMember(member.account)}
					onSave={(role) => {
						handleUpdateMemberRole({ account: member.account, role })
					}}
					role={member.role}
				/>
			)
		},
	)

	return (
		<Page className='flex items-center justify-center'>
			{isOpen && (
				<Modal onOverLayClick={() => setIsOpen(false)}>
					<InviteUserModal block={false} onSubmit={handleInviteUser} />
				</Modal>
			)}
			<section className='w-7/10 max-w-xl flex flex-col items-center justify-center gap-6 rounded-sm p-8 shadow-contrast shadow-sm'>
				<Title className='mb-3'>{data?.name}</Title>
				<div
					className='
						flex flex-col
						w-full
						p-2 pb-7
						border-b-2
						gap-2
					'
				>
					<GroupInfoField field='id' fieldValue={data?._id} />
					<GroupInfoField
						field='name'
						fieldValue={data?.name}
						onSave={isTechLead ? handleNameUpdate : undefined}
						placeholder='devsync'
					/>
					<GroupInfoField
						field='color'
						fieldValue={data?.color}
						onSave={isTechLead ? handleColorUpdate : undefined}
						placeholder='#000000'
					/>
					{data?.repository != null && (
						<GroupInfoField
							field='repository'
							fieldValue={data?.repository}
							onSave={isTechLead ? handleRepositoryUpdate : undefined}
							placeholder='https://github.com'
						/>
					)}
				</div>
				<div
					className='
						flex flex-col
						w-full
						justify-center gap-5
					'
				>
					<PeopleSection>
						<PeopleHeader>
							<h2 className='text-xl'>TechLeads</h2>
							{isTechLead && (
								<Button onClick={() => setIsOpen(true)}>Add</Button>
							)}
						</PeopleHeader>

						<ul className='overflow-x-auto'>{techLeadItems}</ul>
					</PeopleSection>

					<PeopleSection>
						<PeopleHeader>
							<h2 className='text-xl'>Members</h2>
							{isTechLead && (
								<Button onClick={() => setIsOpen(true)}>Add</Button>
							)}
						</PeopleHeader>
						<ul className='overflow-x-auto'>{memberItems}</ul>
					</PeopleSection>
				</div>
				<Button className='w-full mt-5' onClick={handleRemoveGroup}>
					Quit
				</Button>
				{isTechLead && (
					<Button className='w-full' onClick={handleDeleteGroup}>
						Delete
					</Button>
				)}
			</section>
		</Page>
	)
}

export default GroupInfo
