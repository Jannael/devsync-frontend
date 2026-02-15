import VerifyCode from '../component/VerifyCode.component'

function Login() {
	return (
		<div className='min-h-dvh bg-main flex justify-center items-center text-contrast'>
			<div className='flex size-full max-w-7xl'>
				<div className='flex-1 flex flex-col justify-center items-center gap-5 '>
					<img alt='Devsync brand' className='w-96 drop-shadow-xl drop-shadow-primary-shadow' src='/full logo.png'/>
					<p className='text-xl font-bold text-contrast/80'>Less stuff better solutions</p>
				</div>
				<article className='flex-1 flex justify-center items-center size-full'>
					<div className='size-full flex justify-center items-center'>
						<VerifyCode onSubmit={() => {}} />
					</div>
				</article>
			</div>
		</div>
	)
}

export default Login
