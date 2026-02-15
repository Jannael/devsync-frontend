import ForgotPassword from '../component/auth/ForgotPassword.component'
import LoginComponent from '../component/auth/Login.component'
import Signup from '../component/auth/Signup.component'
import Toaster from '../component/ui/Toaster.ui'
import useLoginStore from '../store/Login.store'

function Login() {
	const { show } = useLoginStore()
	return (
		<div className='min-h-dvh bg-main flex justify-center items-center text-contrast p-4'>
			<Toaster />
			<div className='flex flex-col lg:flex-row size-full max-w-7xl gap-10 lg:gap-0'>
				<div className='flex-1 flex flex-col justify-center items-center gap-5 text-center'>
					<img
						alt='Devsync brand'
						className='w-64 md:w-80 lg:w-96 drop-shadow-xl drop-shadow-primary-shadow'
						src='/full logo.png'
					/>
					<p className='text-lg md:text-xl font-bold text-contrast/80'>
						Less stuff better solutions
					</p>
				</div>
				<article className='flex-1 flex justify-center items-center size-full'>
					<div className='w-full flex justify-center items-center'>
						{show === 'login' && <LoginComponent />}
						{show === 'signup' && <Signup />}
						{show === 'forgot-password' && <ForgotPassword />}
					</div>
				</article>
			</div>
		</div>
	)
}

export default Login
