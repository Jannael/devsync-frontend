function VerifyCode({
	onSubmit,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
	return (
		<form
			className='flex flex-col gap-5 w-96 justify-around py-15 px-10 rounded-xl border-primary border'
			onSubmit={onSubmit}
		>
			<h1 className='text-2xl font-bold mb-4'>Verify code</h1>
			<p className='text-sm text-contrast/80'>
				We have sent you a code to your email please verify it
			</p>

			<input
				className='border border-contrast/50 p-2 rounded-full focus:border-accent focus:outline-none transition-all duration-300 px-4'
				placeholder='code'
				type='text'
			/>
			<button
				className='text-contrast py-2 rounded-full px-3 cursor-pointer bg-primary mt-5 hover:bg-shade hover:text-accent transition-all duration-300'
				type='submit'
			>
				Verify
			</button>
		</form>
	)
}

export default VerifyCode
