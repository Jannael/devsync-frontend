import { useRef } from 'react'
import Button from '../ui/Button'
import Label from '../ui/Label'
import Option from '../ui/Option'
import Select from '../ui/Select'
import Wrapper, { WrapperItem } from '../Wrapper'

function UserInput({
	UserAccounts,
	users,
	setUsers,
}: {
	UserAccounts: string[]
	users: string[] | undefined
	setUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>
}) {
	const UserSelectRef = useRef<HTMLSelectElement>(null)

	return (
		<div
			className='
							flex flex-wrap
							w-full
							gap-3 items-center justify-between
						'
		>
			<Label className='flex-3'>
				Users
				<Select className='p-2' ref={UserSelectRef}>
					{UserAccounts.map((account) => {
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
	)
}

export default UserInput
