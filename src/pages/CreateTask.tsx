import { useRef, useState } from 'react'
import Button from '../components/ui/Button'
import Form from '../components/ui/Form'
import Label from '../components/ui/Label'
import Option from '../components/ui/Option'
import Page from '../components/ui/Page'
import Select from '../components/ui/Select'
import Title from '../components/ui/Title'
import Wrapper, { WrapperItem } from '../components/Wrapper'

const accounts = ['1', '2', '3']
function CreateTask() {
	const UserSelectRef = useRef<HTMLSelectElement>(null)
	const [users, setUsers] = useState<string[]>()

	return (
		<Page className='flex justify-center items-center p-4'>
			<Form className='w-full'>
				<Title>Create Task</Title>
				<div className='w-3/10'>
					<div className='w-full flex gap-3 items-center justify-between flex-wrap'>
						<Label className='flex-3'>
							Users
							<Select className='p-2' ref={UserSelectRef}>
								{accounts.map((account) => {
									return <Option key={account}>{account}</Option>
								})}
							</Select>
						</Label>
						<Label className='flex-1'>
							Select User
							<Button
								onClick={() => {
									if (users?.includes(UserSelectRef.current!.value)) return
									setUsers([...(users || []), UserSelectRef.current!.value])
								}}
							>
								Add
							</Button>
						</Label>
						<Wrapper className='w-full' title='Users'>
							{users?.map((user) => {
								return <WrapperItem key={user}>{user}</WrapperItem>
							})}
						</Wrapper>
					</div>
				</div>
				<div></div>
			</Form>
		</Page>
	)
}

export default CreateTask
