import { useState } from 'react'
import { ROUTES } from '../../constant/Route.constant'
import { useRequestCode } from '../../hook/mutation/auth/useRequestCode.mutation'
import { useVerifyCode } from '../../hook/mutation/auth/useVerifyCode.mutation'
import { useDeleteUser } from '../../hook/mutation/user/useDeleteUser.mutation'
import { useDangerZoneStore } from '../../store/DangerZone.store'
import GetFormData from '../../utils/GetFormData.utils'
import VerifyCode from '../auth/VerifyCode.component'
import Overlay from '../ui/Overlay.ui'

function DeleteUserModal() {
	const [error, setError] = useState<string | null>(null)
	const verifyCodeMutation = useVerifyCode()
	const deleteUserMutation = useDeleteUser()
	const requestCodeMutation = useRequestCode()

	const showDeleteAccountModal = useDangerZoneStore(
		(state) => state.showDeleteAccountModal,
	)

	const handleVerifyDeleteAccount = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault()
		try {
			const data = GetFormData(e)
			const res = await verifyCodeMutation.mutateAsync({ code: data.code })
			if (res) {
				const res = await deleteUserMutation.mutateAsync()
				if (res) window.location.href = ROUTES.HOME
			}
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		showDeleteAccountModal && (
			<Overlay
				setShow={() =>
					useDangerZoneStore.setState({ showDeleteAccountModal: false })
				}
			>
				<VerifyCode
					block={
						requestCodeMutation.isPending ||
						verifyCodeMutation.isPending ||
						deleteUserMutation.isPending
					}
					error={error}
					onSubmit={handleVerifyDeleteAccount}
					variant='destructive'
				/>
			</Overlay>
		)
	)
}

export default DeleteUserModal
