import type { ReactNode } from 'react'
import Button from '../components/ui/Button'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import Option from '../components/ui/Option'
import Page from '../components/ui/Page'
import Select from '../components/ui/Select'
import Title from '../components/ui/Title'
import { X } from '../icons'

// display next info
// "_id": "",
//     "techLead": [
//       {
//         "account": "",
//         "fullName": ""
//       }
//     ], // Optional
//     "name": "",
//     "color": "",
//     "repository": "", // Optional
//     "member": [
//       {
//         "account": "",
//         "fullName": "",
//         "role": ""
//       }
//     ] // Optional

//Features
// 1.change roles
// 2.quit
// 3.add/remove members
// 4.update name, color or repository
// 5.delete group

// data mock to render
const data = {
	// cspell:disable-next-line
	_id: 'asdkalkdnb123_+',
	color: '#0000',
	repository: 'github.com/',
	member: [
		{
			account: 'insane account',
			fullName: 'insane fullName',
			role: 'documenter',
		},
			{
			account: 'insane account',
			fullName: 'insane fullName',
			role: 'documenter',
		},
	],
	techLeads: [
		{
			account: 'insane account',
			fullName: 'insane fullName',
		},
		{
			account: 'insane account',
			fullName: 'insane fullName',
		},
	],
}

function GroupInfo() {
	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-7/10 max-w-xl'>
				<Title className='mb-3'>Insane Group</Title>
				<div className='w-full flex flex-col gap-2 border-b-2 p-2 pb-7'>
					<GroupInfoField field='id' fieldValue={data._id} />
					<GroupInfoField
						field='color'
						fieldValue={data.color}
						onSave={() => console.log('save')}
					/>
					{data.repository != null && (
						<GroupInfoField
							field='repository'
							fieldValue={data.repository}
							onSave={() => console.log('save')}
						/>
					)}
				</div>
				<div className='w-full flex justify-center gap-5 flex-col'>
					<PeopleSection>
						<PeopleHeader>
							<h2 className='text-xl'>TechLeads</h2>
							<Button>Add</Button>
						</PeopleHeader>

						<ul className='overflow-x-auto'>
							{data.techLeads.map((techLead) => {
								return (
									<TechLeadItem
										account={techLead.account}
										fullName={techLead.fullName}
										key={techLead.account}
									/>
								)
							})}
						</ul>
					</PeopleSection>

					<PeopleSection>
						<PeopleHeader>
							<h2 className='text-xl'>Members</h2>
							<Button>Add</Button>
						</PeopleHeader>
						<ul className='overflow-x-auto'>
							{data.member.map((member) => {
								return (
									<MemberItem
										account={member.account}
										key={member.account}
										role={member.role}
									/>
								)
							})}
						</ul>
					</PeopleSection>
				</div>
				<Button className='w-full'>Quit</Button>
				<Button className='w-full'>Delete</Button>
			</Form>
		</Page>
	)
}

function PeopleSection({ children }: { children?: ReactNode }) {
	return <section className='w-9/10 m-auto'>{children}</section>
}

function PeopleHeader({ children }: { children: ReactNode }) {
	return (
		<header className='flex items-center justify-between border-b-2 pb-5'>
			{children}
		</header>
	)
}

function GroupInfoField({
	children,
	field,
	fieldValue,
	onSave,
}: {
	children?: ReactNode
	onSave?: () => void
	field?: string
	fieldValue?: string
}) {
	return (
		<div className='flex w-full justify-between items-center h-14 text-sm'>
			<p
				className={`text-sm ${onSave !== undefined && 'border-r-2 pr-2'} w-7/10`}
			>{`${field} = ${fieldValue}`}</p>
			{children}
			{onSave !== undefined && <Button onClick={onSave}> Save</Button>}
		</div>
	)
}

function TechLeadItem({
	account,
	fullName,
	onDelete,
}: {
	account: string
	fullName: string
	onDelete?: () => void
}) {
	return (
		<li className='flex justify-around p-2 items-center border-b-2'>
			<p className='truncate w-1/3 border-r-2 pr-2 min-w-16'>{fullName}</p>
			<p className='truncate w-1/3 border-r-2 pr-2 min-w-16'>{account}</p>
			<button
				className='border-red-500 border-2 text-red-500 cursor-pointer'
				onClick={onDelete}
				type='button'
			>
				<X />
			</button>
		</li>
	)
}

function MemberItem({
	account,
	role,
	onSave,
	onDelete,
}: {
	account: string
	role: string
	onSave?: () => void
	onDelete?: () => void
}) {
	return (
		<li className='flex justify-around p-2 items-center border-b-2'>
			<p className='truncate w-1/3 border-r-2 pr-2 min-w-23'>{account}</p>

			<Select value={role}>
				<Option value='developer'>Developer</Option>
				<Option value='documenter'>Documenter</Option>
			</Select>

			<div className='flex justify-between items-center gap-3 border-l-2 pl-2'>
				<div className='border-r-2 pr-2'>
					<button
						className='border-l-2 px-2 border-r-2 border-2 cursor-pointer rounded-full'
						onClick={onSave}
						type='button'
					>
						Save
					</button>
				</div>

				<button
					className='border-red-500 border-2 text-red-500 cursor-pointer'
					onClick={onDelete}
					type='button'
				>
					<X />
				</button>
			</div>
		</li>
	)
}

export default GroupInfo
