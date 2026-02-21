import { useState } from 'react'
import { useJoinGroup } from '../../hook/mutation/group/useJoinGroup.mutation'
import useMainStore from '../../store/Main.store'
import GetFormData from '../../utils/GetFormData.utils'
import { ObjectIdValidator } from '../../validator/fields/ObjectId.validator'
import Button from '../ui/Button.ui'
import Form from '../ui/Form.ui'
import Input from '../ui/Input.ui'
import Label from '../ui/Label.ui'
import Overlay from '../ui/Overlay.ui'
import P from '../ui/P.ui'
import Title from '../ui/Title.ui'
import Warning from '../ui/Warning.ui'

function JoinGroupModal() {
	const setShowJoinModal = useMainStore((state) => state.setShowJoinModal)
	const [error, setError] = useState<string | null>(null)
	const JoinGroupMutation = useJoinGroup()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = GetFormData(e)
		try {
			ObjectIdValidator(data.groupId)
			const res = await JoinGroupMutation.mutateAsync({ groupId: data.groupId })
			if (res) setShowJoinModal(false)
		} catch (e) {
			setError((e as Error).message)
		}
	}

	return (
		<Overlay setShow={() => setShowJoinModal(false)}>
			<Form onSubmit={handleSubmit}>
				<Title>Join Group</Title>
				<P>Enter id for the group you want to join</P>
				<Label id='groupId'>Group id</Label>
				<Input
					id='groupId'
					name='groupId'
					placeholder='61212ASD9...'
					type='string'
				/>
				{error && <Warning message={error} />}
				<Button block={JoinGroupMutation.isPending} type='submit'>
					JOIN
				</Button>
			</Form>
		</Overlay>
	)
}

export default JoinGroupModal
