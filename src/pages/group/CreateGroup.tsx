import { useRef, useState } from 'react'
import { MemberItem } from '../../components/group/MemberItem'
import { TechLeadItem } from '../../components/group/TechLeadItem'
import Button from '../../components/ui/Button'
import ColorPicker from '../../components/ui/ColorPicker'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import Option from '../../components/ui/Option'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Select from '../../components/ui/Select'
import Title from '../../components/ui/Title'
import Wrapper, { WrapperItem } from '../../components/Wrapper'
import useCreateGroup from '../../hooks/group/useCreateGroup'
import { routesConst } from '../../routes.constants'
import AccountValidation from '../../service/AccountValidation'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import GroupValidator from '../../service/GroupValidation'

function CreateGroup() {
	const [error, setError] = useState<string | null>(null)
	const [members, setMembers] = useState<
		Array<{ account: string; role: string }>
	>([])
	const [techLeads, setTechLeads] = useState<string[]>([])

	const membersInputAccount = useRef<HTMLInputElement | null>(null)
	const membersInputRole = useRef<HTMLSelectElement | null>(null)
	const techLeadInput = useRef<HTMLInputElement | null>(null)

	const { createGroup } = useCreateGroup(() => {
		window.location.href = routesConst.main
	})

	return (
		<Page className='flex justify-center items-center'>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					// adding the members and techLeads to formData so it can be validated
					const formData = new FormData(e.currentTarget)
					formData.append('member', JSON.stringify(members))
					formData.append('techLead', JSON.stringify(techLeads))

					const isValid = ValidateFromSchema({
						formEvent: e,
						setError,
						validator: GroupValidator,
					})
					if (!isValid) return
					const { name, repository, color } = isValid

					createGroup.mutate({ name, repository, color, member: members, techLead: techLeads })
				}}
			>
				<Title>Create group</Title>

				<Label>
					Group name
					<InputText className='w-full' name='name' placeholder='my group' />
				</Label>
				<Label>
					Repository
					<InputText
						className='w-full'
						name='repository'
						placeholder='https://github...'
					/>
				</Label>
				<Label>
					Color
					<ColorPicker name='color' />
				</Label>
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
								<Select
									className='flex-2/5 cursor-pointer'
									ref={membersInputRole}
								>
									<Option value='developer'>Developer</Option>
									<Option value='documenter'>Documenter</Option>
								</Select>
							</Label>
						</div>
						<Button
							className='w-full'
							onClick={() => {
								const account = membersInputAccount.current!.value
								const role = membersInputRole.current!.value
								const isMember = members.find(
									(member) => member.account === account,
								)

								if (isMember !== undefined) {
									setError('User in member list')
									return
								}

								if (!account || !role) return
								membersInputAccount.current!.value = ''

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
							}}
						>
							Add
						</Button>
					</div>
					<Wrapper title='Members'>
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
				<div className='w-full'>
					<div
						className='
							flex
							w-full
							mb-4
							justify-between items-end gap-3
						'
					>
						<Label>
							TechLead account
							<InputText placeholder='example@gmail.com' ref={techLeadInput} />
						</Label>
						<Button
							className=''
							onClick={() => {
								const account = techLeadInput.current!.value
								const isValid = AccountValidation({ account })
								if (typeof isValid === 'string') {
									setError(isValid)
									return
								}
								if (techLeads.includes(account)) {
									setError('account in techLead list')
									return
								}

								setTechLeads([...techLeads, account])
							}}
						>
							Add
						</Button>
					</div>
					<Wrapper title='TechLeads'>
						{techLeads.map((techLead) => {
							return (
								<WrapperItem key={techLead}>
									<TechLeadItem
										account={techLead}
										onDelete={() => {
											const newTechLeads = techLeads.filter(
												(current) => current !== techLead,
											)
											setTechLeads(newTechLeads)
										}}
									/>
								</WrapperItem>
							)
						})}
					</Wrapper>
				</div>
				{error !== null && <P className='text-error'>{error}</P>}
				{createGroup.isError && (
					<P className='text-error'>{createGroup.error.message}</P>
				)}
				<FormButton block={createGroup.isPending}>Create</FormButton>
			</Form>
		</Page>
	)
}

export default CreateGroup
