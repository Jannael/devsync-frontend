import useMainStore from '../../store/Main.store'
import CreateGroup from '../CreateGroup.component'
import Overlay from '../ui/Overlay.ui'

function CreateGroupModal() {
	const { setShowCreateGroupModal } = useMainStore()
	return (
		<Overlay setShow={(show) => setShowCreateGroupModal(show)}>
			<CreateGroup />
		</Overlay>
	)
}

export default CreateGroupModal
