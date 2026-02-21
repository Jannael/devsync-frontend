import Button from '../component/ui/Button.ui'
import { ROUTES } from '../constant/Route.constant'
import { useRequestCode } from '../hook/mutation/auth/useRequestCode.mutation'
import { useGetUser } from '../hook/query/user/useGetUser.query'
import { useDangerZoneStore } from '../store/DangerZone.store'
import DeleteUserModal from './modal/DeleteAccount.modal'
import LogoutModal from './modal/Logout.modal'
import UpdateAccountModal from './modal/UpdateAccount.modal'

function DangerZone() {
	const requestCodeMutation = useRequestCode()
	const { data: user } = useGetUser()

	const handleDeleteAccountRequest = async () => {
		requestCodeMutation.mutate({ account: user?.account ?? '' })
		useDangerZoneStore.setState({ showDeleteAccountModal: true })
	}

	return (
		<section className='flex gap-4 md:gap-8 flex-col border-warning border-2 p-2 md:p-8 rounded-lg'>
			<h2 className='text-2xl font-bold text-warning'>Danger Zone</h2>
			<Button
				block={false}
				className='w-full'
				onClick={() => (window.location.href = ROUTES.LOGIN)}
				type='button'
				variant='destructive'
			>
				Change account
			</Button>
			<Button
				block={false}
				className='w-full'
				onClick={() =>
					useDangerZoneStore.setState({ showUpdateAccountModal: true })
				}
				type='button'
				variant='destructive'
			>
				Update account
			</Button>
			<Button
				block={false}
				className='w-full'
				onClick={() => useDangerZoneStore.setState({ showLogoutModal: true })}
				type='button'
				variant='destructive'
			>
				Logout
			</Button>
			<Button
				block={false}
				className='w-full'
				onClick={handleDeleteAccountRequest}
				type='button'
				variant='destructive'
			>
				Delete account
			</Button>

			<LogoutModal />
			<UpdateAccountModal />
			<DeleteUserModal />
		</section>
	)
}

export default DangerZone
