import { useRef, useState } from 'react'
import FullLogo from '../assets/FullLogo'
import { ROLES } from '../constant/ROLE.constant'
import { ROUTES } from '../constant/Route.constant'
import { GroupColors } from '../constant/Theme.constant'
import { useCreateGroup } from '../hook/mutation/group/useCreateGroup.mutation'
import { SettingsIcon } from '../Icon'
import useMainStore from '../store/Main.store'
import GetFormData from '../utils/GetFormData.utils'
import { GroupValidator } from '../validator/schemas/Group.schema'
import GroupList from './GroupList.component'
import InvitationList from './InvitationList'
import Button from './ui/Button.ui'
import ColorPicker from './ui/ColorPicker.ui'
import Form from './ui/Form.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import Overlay from './ui/Overlay.ui'
import P from './ui/P.ui'
import Title from './ui/Title.ui'
import Warning from './ui/Warning.ui'

function GroupsMenu() {
	const {
		currentGroup,
		currentRole,
		showCreateGroupModal,
		setShowCreateGroupModal,
	} = useMainStore()

	return (
		<section className='flex-1 h-full p-3'>
			<article
				className='flex-1 h-full bg-main flex flex-col justify-between items-center
			border-primary border py-5 rounded-lg px-3 gap-6 overflow-y-auto'
				id='Groups'
			>
				<div className='w-full flex items-center justify-center flex-col gap-6'>
					<FullLogo />
					<div className='flex flex-col w-full gap-4'>
						<GroupList />
						<InvitationList />
					</div>
				</div>

				<article className='w-full flex flex-col items-center justify-center gap-4 text-txt'>
					<a
						className='flex items-center gap-2 text-2xl self-start mb-3'
						href={ROUTES.SETTINGS}
					>
						<div className='size-10 flex items-center justify-center rounded-full'>
							<SettingsIcon />
						</div>
						Settings
					</a>

					{currentGroup !== null && currentRole === ROLES.TECH_LEAD && (
						<Button block={false} className='text-xl w-full' type='button'>
							Create new task
						</Button>
					)}

					<Button
						block={false}
						className='text-xl w-full'
						onClick={() => setShowCreateGroupModal(true)}
						type='button'
					>
						Create new group
					</Button>
					{showCreateGroupModal && <CreateGroupModal />}
				</article>
			</article>
		</section>
	)
}

function CreateGroupModal() {
	const { setShowCreateGroupModal } = useMainStore()
	return (
		<Overlay setShow={(show) => setShowCreateGroupModal(show)}>
			<CreateGroup />
		</Overlay>
	)
}

function CreateGroup() {
	const setShowCreateGroupModal = useMainStore(
		(state) => state.setShowCreateGroupModal,
	)

	const createGroupMutation = useCreateGroup()
	const [error, setError] = useState<string | null>(null)
	const currentGroupColor = useRef({ color: '' })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			const group = GroupValidator({
				data: {
					name: data.name,
					repository: data.repository,
					color: currentGroupColor.current.color,
				},
			})

			const res = await createGroupMutation.mutateAsync({
				name: group.data.name,
				repository: group.data.repository || 'https://github.com/',
				color: group.data.color,
			})
			if (res) setShowCreateGroupModal(false)
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Title>Create group</Title>
			<P>Please fill the form below to create a new group</P>

			<Label id='name'>Name</Label>
			<Input id='name' name='name' placeholder='Devsync' type='text' />
			<Label id='repository'>Repository</Label>
			<Input
				className='mb-3'
				id='repository'
				name='repository'
				placeholder='https://github.com/devsync'
				type='text'
			/>

			<ColorPicker
				colors={GroupColors}
				currentColor={currentGroupColor.current.color}
				label='Color'
				onClick={(color) => {
					currentGroupColor.current.color = color
				}}
			/>
			{error && <Warning message={error} />}
			<Button
				block={createGroupMutation.isPending}
				className='mt-3'
				type='submit'
			>
				Create
			</Button>
		</Form>
	)
}

export default GroupsMenu
