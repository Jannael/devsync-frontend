import UserSection from '../component/UserSection.component'
import Button from '../component/ui/Button.ui'
import Header from '../component/ui/Header.ui'
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
					<Button
						block={false}
						className='flex text-xl justify-center items-center gap-2'
						onClick={() => {
							window.location.href = ROUTES.MAIN
						}}
						type='button'
					>
						Back
						<ArrowLeftIcon />
					</Button>
				</Header>
				<main className=''>
					<UserSection />
				</main>
			</div>
		</div>
	)
}

export default Settings
