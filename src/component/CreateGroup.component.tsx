import { useRef, useState } from 'react'
import { GroupColors } from '../constant/Theme.constant'
import { useCreateGroup } from '../hook/mutation/group/useCreateGroup.mutation'
import useMainStore from '../store/Main.store'
import GetFormData from '../utils/GetFormData.utils'
import { GroupValidator } from '../validator/schemas/Group.schema'
import Button from './ui/Button.ui'
import ColorPicker from './ui/ColorPicker.ui'
import Form from './ui/Form.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import P from './ui/P.ui'
import Title from './ui/Title.ui'
import Warning from './ui/Warning.ui'

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

export default CreateGroup
