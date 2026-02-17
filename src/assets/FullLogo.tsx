import SimplifiedLogo from './SimplifiedLogo'

function FullLogo() {

	return (
		<div className='flex items-start gap-2 text-txt h-fit font-logo size-full justify-center'>
			<div className='w-12 flex items-center shrink-0'>
				<SimplifiedLogo />
			</div>
			<span className='font-bold text-7xl leading-none relative top-2.5'>
				{/* cspell:disable-next-line */}
				evsync
			</span>
		</div>
	)
}

export default FullLogo
