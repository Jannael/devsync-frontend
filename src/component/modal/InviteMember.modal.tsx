import { useState } from 'react'
import Roles from '../../constant/Roles.constant'
import { useCreateInvitation } from '../../hook/mutation/invitation/useCreateInvitation.mutation'
import { useGroupStore } from '../../store/Group.store'
import useMainStore from '../../store/Main.store'
import GetFormData from '../../utils/GetFormData.utils'
import { InvitationValidator } from '../../validator/schemas/Invitation.schema'
import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import Label from '../ui/Label.ui'
import Overlay from '../ui/Overlay.ui'
import P from '../ui/P.ui'
import Select from '../ui/Select.ui'
import Title from '../ui/Title.ui'
import Warning from '../ui/Warning.ui'

function InviteMemberModal() {
	const setShowInviteMemberModal = useGroupStore(
		(state) => state.setShowInviteMemberModal,
	)
	const currentGroup = useMainStore((state) => state.currentGroup)
	const createInvitation = useCreateInvitation()
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			InvitationValidator({
				groupId: currentGroup ?? '',
				data: {
					account: data.account,
					role: data.role as keyof typeof Roles,
				},
			})

			const res = await createInvitation.mutateAsync({
				groupId: currentGroup ?? '',
				data: {
					account: data.account,
					role: data.role as keyof typeof Roles,
				},
			})
			if (res) setShowInviteMemberModal(false)
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return (
		<Overlay setShow={setShowInviteMemberModal}>
			<Form onSubmit={handleSubmit}>
				<Title>invite member</Title>
				<P>Please fill the form below to invite a new member</P>
				<Label id='account'>Account</Label>
				<Input id='account' name='account' placeholder='account' type='text' />
				<Label id='role'>Role</Label>
				<Select id='role' onChange={() => {}} value={Roles.developer}>
					<option value={Roles.documenter}>Documenter</option>
					<option value={Roles.developer}>Developer</option>
					<option value={Roles.techLead}>Tech Lead</option>
				</Select>
				{error && <Warning message={error} />}
				<Button
					block={createInvitation.isPending}
					className='mt-4'
					type='submit'
				>
					Send
				</Button>
			</Form>
		</Overlay>
	)
}

export default InviteMemberModal
