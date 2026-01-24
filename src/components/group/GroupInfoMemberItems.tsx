import { useState } from 'react'
import { X } from '../../icons'
import { roles } from '../../memberRoles'
import Option from '../ui/Option'
import Select from '../ui/Select'

function GroupInfoMemberItem({
	account,
	role,
	onSave,
	onDelete,
}: {
	account: string
	role: string
	onSave?: (val: string) => void
	onDelete?: () => void
}) {
	const [disabled, setDisabled] = useState(true)
	const [selectedRole, setSelectedRole] = useState(role)

	return (
		<li
			className='
				flex
				p-2
				border-b-2
				justify-around items-center
			'
		>
			<p className='w-1/3 min-w-23 pr-2 border-r-2 truncate'>{account}</p>

			<Select
				onChange={(newRole) => {
					setSelectedRole(newRole)
					setDisabled(false)
				}}
				value={role}
			>
				<Option value={roles.techLead}>TechLead</Option>
				<Option value={roles.developer}>Developer</Option>
				<Option value={roles.documenter}>Documenter</Option>
			</Select>

			<div
				className='
					flex
					pl-2
					border-l-2
					justify-between items-center gap-3
				'
			>
				<div className='pr-2 border-r-2'>
					<button
						className='
							px-2
							border-l-2 border-r-2 border-2 rounded-full
							cursor-pointer
						'
						disabled={disabled}
						onClick={() => onSave?.(selectedRole)}
						type='button'
					>
						Save
					</button>
				</div>

				<button
					className='
						text-red-500
						border-red-500 border-2
						cursor-pointer
					'
					onClick={onDelete}
					type='button'
				>
					<X />
				</button>
			</div>
		</li>
	)
}

export default GroupInfoMemberItem
