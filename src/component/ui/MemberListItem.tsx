import { useState } from 'react'
import Roles from '../../constant/Roles.constant'
import { useRemoveMember } from '../../hook/mutation/member/useRemoveMember.mutation'
import { useUpdateMemberRole } from '../../hook/mutation/member/useUpdateMemberRole.mutation'
import type { Member } from '../../interface/Member'
import useMainStore from '../../store/Main.store'
import Button from './Button.ui'
import Select from './Select.ui'

function MemberListItem({
	member,
	groupId,
}: {
	member: Member
	groupId: string
}) {
	const [selectedRole, setSelectedRole] = useState(member.role)
	const updateMemberRole = useUpdateMemberRole()
	const removeMember = useRemoveMember()
	const currentRole = useMainStore((state) => state.currentRole)

	const isChanged = selectedRole !== member.role

	const handleSave = () => {
		updateMemberRole.mutate({
			groupId,
			account: member.account,
			newRole: selectedRole,
		})
	}

	const handleRemove = () => {
		removeMember.mutate({
			groupId,
			account: member.account,
		})
	}

	return (
		<div
			className='flex flex-col sm:flex-row justify-between items-center w-full border-b border-primary py-4 px-3 gap-4'
			key={member.account}
		>
			<p className='flex-1 font-bold'>{member.account}</p>
			<div className='flex items-center gap-3 w-full sm:w-auto'>
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
							Remove
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

export default MemberListItem
