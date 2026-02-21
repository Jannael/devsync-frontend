import { useDangerZoneStore } from '../../store/DangerZone.store'
import UpdateAccount from '../ChangeAccount.component'
import Overlay from '../ui/Overlay.ui'

function UpdateAccountModal() {
	const showUpdateAccountModal = useDangerZoneStore(
		(state) => state.showUpdateAccountModal,
	)

	return (
		showUpdateAccountModal && (
			<Overlay
				setShow={() =>
					useDangerZoneStore.setState({ showUpdateAccountModal: false })
				}
			>
				<UpdateAccount />
			</Overlay>
		)
	)
}

export default UpdateAccountModal
