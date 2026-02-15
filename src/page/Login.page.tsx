import VerifyCode from '../component/VerifyCode.component'

function Login() {
	return (
		<div className='min-h-dvh bg-main flex justify-center items-center text-contrast'>
			<div className='flex-1'></div>
			<article className='flex-1 flex justify-center items-center size-full'>
				<div className='size-full flex justify-center items-center'>
					<VerifyCode onSubmit={() => {}} />
				</div>
			</article>
		</div>
	)
}

export default Login
