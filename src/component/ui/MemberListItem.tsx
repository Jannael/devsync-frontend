import { useState } from 'react'
import Roles from '../../constant/Roles.constant'
import { useCancelInvitation } from '../../hook/mutation/invitation/useCancelInvitation.mutation'
import { useUpdateInvitationRole } from '../../hook/mutation/invitation/useUpdateInvitationRole.mutation'
import { useRemoveMember } from '../../hook/mutation/member/useRemoveMember.mutation'
import { useUpdateMemberRole } from '../../hook/mutation/member/useUpdateMemberRole.mutation'
import type { Member } from '../../interface/Member'
import useMainStore from '../../store/Main.store'
import Button from './Button.ui'
import Select from './Select.ui'

function MemberListItem({
	member,
	groupId,
	mode = 'member',
}: {
	member: Member
	groupId: string
	mode?: 'member' | 'invitation'
}) {
	const [selectedRole, setSelectedRole] = useState(member.role)
	const updateMemberRole = useUpdateMemberRole()
	const removeMember = useRemoveMember()
	const currentRole = useMainStore((state) => state.currentRole)

	const isChanged = selectedRole !== member.role

	const cancelInvitation = useCancelInvitation()
	const updateInvitationRole = useUpdateInvitationRole()

	const handleSave = () => {
		if (mode === 'member') {
			updateMemberRole.mutate({
				groupId,
				account: member.account,
				newRole: selectedRole,
			})
		} else {
			updateInvitationRole.mutate({
				groupId,
				account: member.account,
				newRole: selectedRole,
			})
		}
	}

	const handleRemove = () => {
		if (mode === 'member') {
			removeMember.mutate({
				groupId,
				account: member.account,
			})
		} else {
			cancelInvitation.mutate({
				groupId,
				account: member.account,
			})
		}
	}

	return (
		<div
			className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-b border-primary py-4 px-3 gap-4'
			key={member.account}
		>
			<p className='w-full sm:flex-1 font-bold break-all text-center sm:text-left'>{member.account}</p>
			<div className='flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end'>
				{currentRole === Roles.techLead ? (
					<Select
						id={`role-${member.account}`}
						onChange={(e) => setSelectedRole(e.target.value)}
						value={selectedRole}
					>
						{Object.values(Roles).map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</Select>
				) : (
					<p className='font-bold'>{member.role}</p>
				)}
				{currentRole === Roles.techLead && (
					<>
						<Button block={!isChanged} onClick={handleSave} type='button'>
							Save
						</Button>
						<Button
							block={false}
							onClick={handleRemove}
							type='button'
							variant='destructive'
						>
							{mode === 'member' ? 'Remove' : 'Cancel'}
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

export default MemberListItem
