import type { ReactNode } from 'react'
import Form from '../components/ui/Form'
import Button from '../components/ui/FormButton'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'

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
			role: 'developer',
		},
	],
	techLeads: [
		{
			account: 'insane account',
			fullName: 'insane fullName',
		},
	],
}

function GroupInfo() {
	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-2xl'>
				<Title>Insane Group</Title>
				<div>
					<GroupInfoField onSave={() => console.log('save')}/>
				</div>
			</Form>
		</Page>
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
		<div className='flex w-full justify-between'>
			<p>{`${field}= ${fieldValue}`}</p>
			{children}
			{onSave !== undefined && <button type='button'> Save</button>}
		</div>
	)
}

export default GroupInfo
