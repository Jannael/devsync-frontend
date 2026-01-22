import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { Toaster, toast } from 'sonner'
import GroupInfoField from '../../components/group/GroupInfoField'
import MemberItem from '../../components/group/GroupInfoMemberItems'
import TechLeadItem from '../../components/group/GroupInfoTechLeadItem'
import { PeopleHeader, PeopleSection } from '../../components/group/People'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import Page from '../../components/ui/Page'
import Title from '../../components/ui/Title'
import useGetGroup from '../../hooks/group/useGetGroup'
import GroupModel from '../../service/api/models/group/model'
import ColorValidator from '../../service/HexColorValidation'
import urlValidator from '../../service/UrlValidator'

//Features
// 1.change roles
// 2.quit
// 3.add/remove members
// 4.update name, color or repository
// 5.delete group

function GroupInfo() {
	const [searchParams] = useSearchParams()
	const queryClient = useQueryClient()
	const groupId = searchParams.get('groupId')
	const { group } = useGetGroup({ groupId })
	if (group.isError) toast.error(group.error.message)

	const data = group.data?.result

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

	const updateGroup = useMutation({
		mutationFn: GroupModel.update,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [groupId] })
		},
	})

	if (updateGroup.isError) toast.error(updateGroup.error.message)

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
						onSave={(value) => {
							if (value === '' || value === undefined) return
							const isValid = ColorValidator({ color: value })
							if (typeof isValid === 'string') return toast.error(isValid)

							updateGroup.mutate({
								_id: data?._id,
								data: {
									color: value,
									name: undefined,
									repository: undefined,
								},
							})
						}}
					/>
					{data?.repository != null && (
						<GroupInfoField
							field='repository'
							fieldValue={data?.repository}
							onSave={(value) => {
								if (value === '' || value === undefined) return
								const isValid = urlValidator({ repository: value })
								if (typeof isValid === 'string') return toast.error(isValid)

								updateGroup.mutate({
									_id: data?._id,
									data: {
										repository: value,
										name: undefined,
										color: undefined,
									},
								})
							}}
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
