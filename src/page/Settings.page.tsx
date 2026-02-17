import AppearanceSection from '../component/AppearanceSection.component'
import DangerZone from '../component/DangerZone.component'
import UserSection from '../component/UserSection.component'
import Header from '../component/ui/Header.ui'
import Link from '../component/ui/Link'
import Toaster from '../component/ui/Toaster.ui'
import { ROUTES } from '../constant/Route.constant'
import { useGetUser } from '../hook/query/user/useGetUser.query'
import { ArrowLeftIcon } from '../Icon'

function Settings() {
	const { data: user } = useGetUser()
	return (
		<div className='min-h-dvh bg-main flex justify-center text-txt p-2 md:p-8 font-main'>
			<Toaster />
			<div className='w-full max-w-7xl'>
				<Header>
					<div className='flex flex-col gap-1 md:gap-2 items-center sm:items-start text-center sm:text-left'>
						<h1 className='text-3xl md:text-4xl font-bold'>Settings</h1>
						<p className='text-xl text-txt/80 break-all'>{user?.account}</p>
					</div>
					<Link to={ROUTES.MAIN}>
						Back
						<ArrowLeftIcon />
					</Link>
				</Header>
				<main className='flex gap-8 flex-col'>
					<UserSection />
					<AppearanceSection />
					<DangerZone />
				</main>
			</div>
		</div>
	)
}

export default Settings
