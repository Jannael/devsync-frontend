import { useRef, useState } from 'react'
import Button from '../components/ui/Button'
import ColorPicker from '../components/ui/ColorPicker'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import Option from '../components/ui/Option'
import Page from '../components/ui/Page'
import Select from '../components/ui/Select'
import Title from '../components/ui/Title'
import Wrapper, { WrapperItem } from '../components/Wrapper'
import { CircleMinus } from '../icons'

function CreateGroup() {
	const [members, setMembers] = useState<{ account: string; role: string }[]>(
		[],
	)

	const membersInputAccount = useRef<HTMLInputElement | null>(null)
	const membersInputRole = useRef<HTMLSelectElement | null>(null)

	return (
		<Page
			className='
				flex
				justify-center items-center
			'
		>
			<Form>
				<Title>Create group</Title>

				<Label>
					Group name
					<InputText
						className='
							w-full
						'
						placeholder='my group'
					/>
				</Label>
				<Label>
					Repository
					<InputText
						className='
							w-full
						'
						placeholder='https://github...'
					/>
				</Label>
				<Label>
					Color
					<ColorPicker />
				</Label>

				<div className='w-full'>
					<Label className='mb-4'>
						Members
						<div className='flex justify-between gap-3 flex-wrap'>
							<InputText placeholder='@gmail.com' ref={membersInputAccount} />
							<Select className='cursor-pointer' ref={membersInputRole}>
								<Option value='developer'>Developer</Option>
								<Option value='documenter'>Documenter</Option>
							</Select>
							<Button
								className='w-full'
								onClick={() => {
									const account = membersInputAccount.current!.value
									const role = membersInputRole.current!.value
									const isMember = members.find(
										(member) => member.account === account,
									)

									if (isMember !== undefined) return
									if (!account || !role) return
									membersInputAccount.current!.value = ''

									setMembers([
										...members,
										{
											account,
											role,
										},
									])
								}}
							>
								Save
							</Button>
						</div>
					</Label>

					<Wrapper>
						{members.map((member) => {
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
						})}
					</Wrapper>
				</div>

				<Label>TechLeads</Label>

				<FormButton>Create</FormButton>
			</Form>
		</Page>
	)
}

export function MemberItem({
	account,
	memberRole,
	onDelete,
}: {
	account: string
	memberRole: string
	onDelete: () => void
}) {
	return (
		<output
			className='
				flex
				justify-around items-center gap-3
			'
		>
			<p
				className='
					flex-3/5
					border-r-2
					truncate
				'
			>
				{account}
			</p>
			<p
				className='
					flex-1/5
					text-center
				'
			>
				{memberRole}
			</p>
			<button
				className='
					flex-1/5 flex
					border-l-2
					cursor-pointer
					justify-center items-center
				'
				onClick={onDelete}
				type='button'
			>
				<CircleMinus />
			</button>
		</output>
	)
}

export default CreateGroup
