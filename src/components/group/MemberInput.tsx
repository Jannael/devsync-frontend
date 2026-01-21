import { useRef } from 'react'
import AccountValidation from '../../service/AccountValidation'
import Button from '../ui/Button'
import InputText from '../ui/InputText'
import Label from '../ui/Label'
import Option from '../ui/Option'
import Select from '../ui/Select'
import Wrapper, { WrapperItem } from '../Wrapper'
import { MemberItem } from './MemberWrapperItem'

function MemberInput({
	setError,
	members,
	setMembers,
}: {
	setError: React.Dispatch<React.SetStateAction<string | null>>
	members: Array<{ account: string; role: string }>
	setMembers: React.Dispatch<
		React.SetStateAction<Array<{ account: string; role: string }>>
	>
}) {
	const membersInputAccount = useRef<HTMLInputElement | null>(null)
	const membersInputRole = useRef<HTMLSelectElement | null>(null)

	const handleAddMember = () => {
		const account = membersInputAccount.current!.value
		const role = membersInputRole.current!.value

		const isMember = members.find((member) => member.account === account)
		if (isMember !== undefined) {
			setError('User in member list')
			return
		}

		if (!account || !role) return

		const isValidAccount = AccountValidation({ account })
		if (typeof isValidAccount === 'string') {
			setError(isValidAccount)
			return
		}

		setMembers([
			...members,
			{
				account,
				role,
			},
		])
		membersInputAccount.current!.value = ''
	}

	const memberList = members.map((member) => {
		const { account, role } = member
		return (
			<WrapperItem key={account}>
				<MemberItem
					account={account}
					memberRole={role}
					onDelete={() => {
						const newMembers = members.filter(
							(member) => member.account !== account,
						)
						setMembers(newMembers)
					}}
				/>
			</WrapperItem>
		)
	})

	return (
		<div className='w-full'>
			<div
				className='
							flex flex-wrap
							mb-4
							justify-between gap-3
						'
			>
				<div className='flex w-full justify-between gap-3'>
					<Label className='w-2/3'>
						Member account
						<InputText
							placeholder='example@gmail.com'
							ref={membersInputAccount}
						/>
					</Label>
					<Label>
						Member role
						<Select className='flex-2/5 cursor-pointer' ref={membersInputRole}>
							<Option value='developer'>Developer</Option>
							<Option value='documenter'>Documenter</Option>
						</Select>
					</Label>
				</div>
				<Button className='w-full' onClick={handleAddMember}>
					Add
				</Button>
			</div>
			<Wrapper title='Members'>{memberList}</Wrapper>
		</div>
	)
}
export default MemberInput
