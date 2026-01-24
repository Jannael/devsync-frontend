import { useState } from 'react'
import { roles } from '../memberRoles'
import AccountValidation from '../service/AccountValidation'
import Form from './ui/Form'
import FormButton from './ui/FormButton'
import InputText from './ui/InputText'
import Label from './ui/Label'
import Option from './ui/Option'
import P from './ui/P'
import Select from './ui/Select'

function InviteUserModal({
	block,
	onSubmit,
}: {
	block: boolean
	onSubmit?: ({ account, role }: { account: string; role: string }) => void
}) {
	const [error, setError] = useState<string | null>(null)

	return (
		<Form
			className='text-start'
			onSubmit={(e) => {
				e.preventDefault()
				const formData = new FormData(e.currentTarget)
				const data = Object.fromEntries(formData.entries())
				const isValid = AccountValidation({ account: data.account.toString() })
				if (typeof isValid === 'string') {
					setError(isValid)
					return
				}

				onSubmit?.({
					account: data.account.toString(),
					role: data.role.toString(),
				})
			}}
		>
			<h2 className='text-2xl'>Invitation</h2>
			<Label>
				Account
				<InputText name='account' placeholder='account' value='' />
			</Label>
			<Label>
				Role
				<Select name='role' value={roles.developer}>
					<Option value={roles.techLead}>TechLead</Option>
					<Option value={roles.developer}>Developer</Option>
					<Option value={roles.documenter}>Documenter</Option>
				</Select>
			</Label>
			{error && <P className='text-red-500'>{error}</P>}
			<FormButton block={block}>Send</FormButton>
		</Form>
	)
}

export default InviteUserModal
