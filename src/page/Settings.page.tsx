import AppearanceSection from '../component/AppearanceSection.component'
import UserSection from '../component/UserSection.component'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Toaster from '../component/ui/Toaster.ui'
import { ROUTES } from '../constant/Route.constant'
import { ArrowLeftIcon } from '../Icon'

function Settings() {
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
				</main>
			</div>
		</div>
	)
}

export default Settings
