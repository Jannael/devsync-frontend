import { lazy, Suspense } from 'react'
import FullLogo from '../assets/FullLogo'
import Pet from '../assets/Pet'
import LoginComponent from '../component/auth/Login.component'
import Loading from '../component/ui/Loading.ui'
import Toaster from '../component/ui/Toaster.ui'
import useLoginStore from '../store/Login.store'

const Signup = lazy(() => import('../component/auth/Signup.component'))
const ForgotPassword = lazy(
	() => import('../component/auth/ForgotPassword.component'),
)

function Login() {
	const { show } = useLoginStore()
	return (
		<div className='h-screen bg-main flex justify-center items-center text-txt p-4'>
			<Toaster />
			<main className='flex flex-col lg:flex-row size-full max-w-7xl gap-10 lg:gap-0'>
				<div className='flex-1 flex flex-col justify-center items-center gap-5 text-center'>
					<div className='w-7/10'>
						<Pet />
					</div>
					<FullLogo />
					<p className='text-lg md:text-xl font-bold text-txt/80'>
						Less stuff better solutions
					</p>
				</div>
				<article className='flex-1 flex justify-center items-center size-full'>
					<div className='w-full flex justify-center items-center h-full'>
						{show === 'login' && <LoginComponent />}
						<Suspense fallback={<Loading />}>
							{show === 'signup' && <Signup />}
							{show === 'forgot-password' && <ForgotPassword />}
						</Suspense>
					</div>
				</article>
			</main>
		</div>
	)
}

export default Login
