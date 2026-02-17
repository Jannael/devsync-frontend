import { lazy, Suspense } from 'react'
import LoginComponent from '../component/auth/Login.component'
import Toaster from '../component/ui/Toaster.ui'
import { fullLogo } from '../constant/Images.constant'
import useLoginStore from '../store/Login.store'

const Signup = lazy(() => import('../component/auth/Signup.component'))
const ForgotPassword = lazy(
	() => import('../component/auth/ForgotPassword.component'),
)

function Login() {
	const { show } = useLoginStore()
	return (
		<div className='min-h-dvh bg-main flex justify-center items-center text-txt p-4'>
			<Toaster />
			<main className='flex flex-col lg:flex-row size-full max-w-7xl gap-10 lg:gap-0'>
				<div className='flex-1 flex flex-col justify-center items-center gap-5 text-center'>
					<img
						alt='Devsync brand'
						className='w-64 md:w-80 lg:w-96 drop-shadow-xl drop-shadow-primary-shadow'
						src={fullLogo}
					/>
					<p className='text-lg md:text-xl font-bold text-txt/80'>
						Less stuff better solutions
					</p>
				</div>
				<article className='flex-1 flex justify-center items-center size-full'>
					<div className='w-full flex justify-center items-center'>
						{show === 'login' && <LoginComponent />}
						<Suspense fallback={<div>Loading...</div>}>
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
