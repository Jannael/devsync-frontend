import { useRef, useState } from 'react'
import Roles from '../constant/Roles.constant'
import { GroupColors } from '../constant/Theme.constant'
import { useUpdateGroup } from '../hook/mutation/group/useUpdateGroup.mutation'
import { useGetGroup } from '../hook/query/group/useGetGroup.query'
import useMainStore from '../store/Main.store'
import Button from './ui/Button.ui'
import ColorPicker from './ui/ColorPicker.ui'
import UpdateTextInput from './ui/UpdateTextInput.ui'

function UpdateGroupInfo() {
	const currentGroup = useMainStore((state) => state.currentGroup)
	const currentRole = useMainStore((state) => state.currentRole)
	const [changeColor, setChangeColor] = useState<string | null>(null)
	const { data: group } = useGetGroup(currentGroup ?? '')
	const updateGroupMutation = useUpdateGroup()

	const GroupInfo = useRef<{
		name: string | null
		repository: string | null
	}>({
		name: group?.name ?? null,
		repository: group?.repository ?? null,
	})

	const handleUpdateGroup = () => {
		updateGroupMutation.mutate({
			groupId: currentGroup ?? '',
			data: {
				name: GroupInfo.current.name ?? undefined,
				repository: GroupInfo.current.repository ?? undefined,
				color: changeColor ?? undefined,
			},
		})
	}

	return (
		<section className='px-2 md:px-8 flex flex-col gap-6'>
			<UpdateTextInput
				label='Group Name'
				onSave={(val, cb) => {
					GroupInfo.current.name = val
					handleUpdateGroup()
					cb(null)
				}}
				placeholder='Devsync'
				validRoles={[Roles.techLead]}
				value={GroupInfo.current.name ?? ''}
			/>
			<UpdateTextInput
				label='Repository'
				onSave={(val, cb) => {
					GroupInfo.current.repository = val
					handleUpdateGroup()
					cb(null)
				}}
				placeholder='Devsync'
				validRoles={[Roles.techLead]}
				value={GroupInfo.current.repository ?? ''}
			/>
			<div className='flex gap-4 w-full border-b border-primary/50 pb-6'>
				<ColorPicker
					colors={GroupColors}
					currentColor={group?.color ?? GroupColors[0]}
					label='Group Color'
					onClick={(color) => setChangeColor(color)}
				/>
				{changeColor && currentRole === Roles.techLead && (
					<Button
						block={false}
						onClick={() => {
							setChangeColor(null)
							handleUpdateGroup()
						}}
						type='button'
					>
						Save
					</Button>
				)}
			</div>
		</section>
	)
}
export default UpdateGroupInfo
