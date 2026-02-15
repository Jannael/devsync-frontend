import { Link } from 'react-router'
import { ROUTES } from '../../constant/Route.constant'
import { GithubIcon } from '../../Icon'

function HeroSection() {
	return (
		<section
			className='min-h-screen flex flex-col md:flex-row items-center justify-center p-10 md:p-0'
			id='Home'
		>
			<div className='flex gap-2 flex-1 justify-center flex-col md:ml-40 text-center md:text-left items-center md:items-start'>
				<a
					className='h-fit w-fit mb-3'
					href='https://github.com/jannael/devsync'
					rel='noopener'
					target='_blank'
				>
					<div className='flex gap-3 bg-black px-4 py-2 md:px-5 md:py-3 rounded-full border-contrast border text-white text-sm md:text-base'>
						<GithubIcon />
						Devsync is Open Source
					</div>
				</a>

				<h1 className='text-4xl md:text-6xl font-bold mb-3 md:mb-5'>Devsync</h1>
				<p className='text-lg md:text-2xl text-contrast/70'>
					Task management and solution tracking
				</p>
				<Link
					className='px-5 py-3 md:px-6 md:py-4 bg-shade w-fit rounded-full text-lg md:text-xl mt-3 hover:bg-accent transition-all duration-300 font-main'
					to={ROUTES.MAIN}
				>
					Try now
				</Link>
			</div>
			<div className='flex gap-2 flex-1 justify-center mt-10 md:mt-0'>
				<img
					alt='Devsync'
					className='w-4/5 md:w-full max-w-sm md:max-w-none aspect-auto h-fit'
					src='/pet.png'
				/>
			</div>
		</section>
	)
}

export default HeroSection
