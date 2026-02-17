import { useState } from 'react'
import AppearanceSection from '../component/AppearanceSection.component'
import VerifyCode from '../component/auth/VerifyCode.component'
import UpdateAccount from '../component/ChangeAccount.component'
import Logout from '../component/Logout.component'
import UserSection from '../component/UserSection.component'
import Button from '../component/ui/Button.ui'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Overlay from '../component/ui/Overlay.ui'
import Toaster from '../component/ui/Toaster.ui'
import { ROUTES } from '../constant/Route.constant'
import { useRequestCode } from '../hook/mutation/auth/useRequestCode.mutation'
import { useVerifyCode } from '../hook/mutation/auth/useVerifyCode.mutation'
import { useDeleteUser } from '../hook/mutation/user/useDeleteUser.mutation'
import { useGetUser } from '../hook/query/user/useGetUser.query'
import { ArrowLeftIcon } from '../Icon'
import { useDangerZoneStore } from '../store/DangerZone.store'
import GetFormData from '../utils/GetFormData.utils'

function Settings() {
	const { showUpdateAccountModal, showLogoutModal, showDeleteAccountModal } =
		useDangerZoneStore()
	const [error, setError] = useState<string | null>(null)
	const requestCodeMutation = useRequestCode()
	const verifyCodeMutation = useVerifyCode()
	const deleteUserMutation = useDeleteUser()
	const { data: user } = useGetUser()

	const handleDeleteAccountRequest = async () => {
		requestCodeMutation.mutate({ account: user?.account ?? '' })
		useDangerZoneStore.setState({ showDeleteAccountModal: true })
	}

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
		<div className='min-h-dvh bg-main flex justify-center text-txt p-4 font-main'>
			<Toaster />
			<div className='w-full max-w-7xl'>
				<Header>
					<h1 className='text-4xl font-bold'>Settings</h1>
					<Link to={ROUTES.MAIN}>
						Back
						<ArrowLeftIcon />
					</Link>
				</Header>
				<main className='flex gap-8 flex-col'>
					<UserSection />
					<AppearanceSection />
					<section className='flex gap-8 flex-col border-warning border-2 p-4 rounded-lg'>
						<h2 className='text-2xl font-bold text-warning'>Danger Zone</h2>
						<Button
							block={false}
							onClick={() =>
								useDangerZoneStore.setState({ showUpdateAccountModal: true })
							}
							type='button'
							variant='destructive'
						>
							Change account
						</Button>
						<Button
							block={false}
							onClick={() =>
								useDangerZoneStore.setState({ showLogoutModal: true })
							}
							type='button'
							variant='destructive'
						>
							Logout
						</Button>
						<Button
							block={false}
							onClick={handleDeleteAccountRequest}
							type='button'
							variant='destructive'
						>
							Delete account
						</Button>
						{showLogoutModal && (
							<Overlay
								setShow={() =>
									useDangerZoneStore.setState({ showLogoutModal: false })
								}
							>
								<Logout />
							</Overlay>
						)}
						{showUpdateAccountModal && (
							<Overlay
								setShow={() =>
									useDangerZoneStore.setState({ showUpdateAccountModal: false })
								}
							>
								<UpdateAccount />
							</Overlay>
						)}
						{showDeleteAccountModal && (
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
						)}
					</section>
				</main>
			</div>
		</div>
	)
}

export default Settings
