import { Toaster } from 'sonner'
import GroupInfoField from '../../components/group/GroupInfoField'
import MemberItem from '../../components/group/GroupInfoMemberItems'
import TechLeadItem from '../../components/group/GroupInfoTechLeadItem'
import { PeopleHeader, PeopleSection } from '../../components/group/People'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useGroupInfoComponent from '../../hooks/components/useGroupInfoComponent'

//Features
// 1.change roles
// 2.quit
// 3.add/remove members
// 4.update name, color or repository
// 5.delete group

function GroupInfo() {
	const { data, handleColorUpdate, handleRepositoryUpdate } =
		useGroupInfoComponent()

	const techLeadItems = data?.techLead?.map(
		(techLead: { account: string; fullName: string }) => {
			return (
				<TechLeadItem
					account={techLead.account}
					fullName={techLead.fullName}
					key={techLead.account}
				/>
			)
		},
	)

	const memberItems = data?.member?.map(
		(member: { account: string; role: string }) => {
			return (
				<MemberItem
					account={member.account}
					key={member.account}
					role={member.role}
				/>
			)
		},
	)

	return (
		<Page className='flex items-center justify-center'>
			<Toaster />
			<Form className='w-7/10 max-w-xl'>
				<Title className='mb-3'>Insane Group</Title>
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
						field='color'
						fieldValue={data?.color}
						onSave={handleColorUpdate}
					/>
					{data?.repository != null && (
						<GroupInfoField
							field='repository'
							fieldValue={data?.repository}
							onSave={handleRepositoryUpdate}
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
							<Button>Add</Button>
						</PeopleHeader>

						<ul className='overflow-x-auto'>{techLeadItems}</ul>
					</PeopleSection>

					<PeopleSection>
						<PeopleHeader>
							<h2 className='text-xl'>Members</h2>
							<Button>Add</Button>
						</PeopleHeader>
						<ul className='overflow-x-auto'>{memberItems}</ul>
					</PeopleSection>
				</div>
				<Button className='w-full'>Quit</Button>
				<Button className='w-full'>Delete</Button>
			</Form>
		</Page>
	)
}

export default GroupInfo
