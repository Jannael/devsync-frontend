import AppearanceSection from '../component/AppearanceSection.component'
import Logout from '../component/Logout.component'
import UserSection from '../component/UserSection.component'
import Button from '../component/ui/Button.ui'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Overlay from '../component/ui/Overlay.ui'
import Toaster from '../component/ui/Toaster.ui'
import { ROUTES } from '../constant/Route.constant'
import { ArrowLeftIcon } from '../Icon'
import {
	useDangerZoneStore,
} from '../store/DangerZone.store'

function Settings() {
	const { showUpdateAccountModal, showLogoutModal, showDeleteAccountModal } =
		useDangerZoneStore()

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
						<Button block={false} type='button' variant='destructive'>
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
					</section>
				</main>
			</div>
		</div>
	)
}

export default Settings
