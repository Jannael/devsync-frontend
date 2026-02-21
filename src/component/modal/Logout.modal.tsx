import { useDangerZoneStore } from '../../store/DangerZone.store'
import Logout from '../Logout.component'
import Overlay from '../ui/Overlay.ui'

function LogoutModal() {
	const showLogoutModal = useDangerZoneStore((state) => state.showLogoutModal)

	return (
		showLogoutModal && (
			<Overlay
				setShow={() => useDangerZoneStore.setState({ showLogoutModal: false })}
			>
				<Logout />
			</Overlay>
		)
	)
}

export default LogoutModal
