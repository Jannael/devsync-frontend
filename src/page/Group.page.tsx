import { useRef, useState } from 'react'
import Button from '../component/ui/Button.ui'
import ColorPicker from '../component/ui/ColorPicker.ui'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Toaster from '../component/ui/Toaster.ui'
import UpdateTextInput from '../component/ui/UpdateTextInput.ui'
import { ROUTES } from '../constant/Route.constant'
import { GroupColors } from '../constant/Theme.constant'
import { useUpdateGroup } from '../hook/mutation/group/useUpdateGroup.mutation'
import { useGetGroup } from '../hook/query/group/useGetGroup.query'
import { ArrowLeftIcon } from '../Icon'
import useMainStore from '../store/Main.store'

function GroupPage() {
	const currentGroup = useMainStore((state) => state.currentGroup)
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
		<div className='min-h-dvh bg-main flex justify-center text-txt p-2 md:p-8 font-main'>
			<Toaster />
			<div className='w-full max-w-7xl'>
				<Header className='mb-6 md:mb-10'>
					<div className='flex flex-col gap-1 md:gap-2 items-center sm:items-start text-center sm:text-left'>
						<h1 className='text-3xl md:text-4xl font-bold'>Group Settings</h1>
					</div>
					<Link to={ROUTES.MAIN}>
						Back
						<ArrowLeftIcon />
					</Link>
				</Header>
				<main className='flex gap-8 flex-col'>
					<div className='px-2 md:px-8 flex flex-col gap-6'>
						<UpdateTextInput
							label='Group Name'
							onSave={(val, cb) => {
								GroupInfo.current.name = val
								handleUpdateGroup()
								cb(null)
							}}
							placeholder='Devsync'
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
							value={GroupInfo.current.repository ?? ''}
						/>
						<div className='flex gap-4 w-full border-b border-primary/50 pb-6'>
							<ColorPicker
								colors={GroupColors}
								currentColor={group?.color ?? GroupColors[0]}
								label='Group Color'
								onClick={(color) => setChangeColor(color)}
							/>
							{changeColor && (
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
					</div>
				</main>
			</div>
		</div>
	)
}

export default GroupPage
