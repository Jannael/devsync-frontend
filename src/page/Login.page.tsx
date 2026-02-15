import VerifyCode from '../component/auth/VerifyCode.component'

function Login() {
	return (
		<div className='min-h-dvh bg-main flex justify-center items-center text-contrast p-4'>
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
						<VerifyCode onSubmit={() => {}} />
					</div>
				</article>
			</div>
		</div>
	)
}

export default Login
