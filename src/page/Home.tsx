import { Link } from 'react-router'
import HomeNavbar from '../component/HomeNavbar'
import { ROUTES } from '../constant/Route.constant'
import { CheckIcon, GithubIcon } from '../Icon'

const features = [
	'Easy to use',
	'Solution tracking',
	'Task management',
	'Documenter role',
]

function HomePage() {
	const featureItems = features.map((feature) => {
		return (
			<li className='flex items-center gap-2 [&>svg]:text-shade text-2xl text-contrast/80' key={feature}>
				<CheckIcon />
				<p>{feature}</p>
			</li>
		)
	})
	return (
		<div className='bg-main text-contrast min-h-screen font-main'>
			<HomeNavbar />
			<main className='flex flex-col max-w-7xl mx-auto'>
				<section
					className='h-screen flex items-center justify-center'
					id='Home'
				>
					<div className='flex gap-2 flex-1 justify-center flex-col ml-40'>
						<a
							className='h-fit w-fit mb-3'
							href='https://github.com/jannael/devsync'
							rel='noopener'
							target='_blank'
						>
							<div className='flex gap-3 bg-black px-5 py-3 rounded-full border-contrast border text-white'>
								<GithubIcon />
								Devsync is Open Source
							</div>
						</a>

						<h1 className='text-6xl font-bold mb-5'>Devsync</h1>
						<p className='text-2xl text-contrast/70'>
							Task management and solution tracking
						</p>
						<Link
							className='px-6 py-4 bg-accent w-fit rounded-full text-xl mt-3 hover:bg-shade transition-all duration-300 font-main'
							to={ROUTES.MAIN}
						>
							Try now
						</Link>
					</div>
					<div className='flex gap-2 flex-1'>
						<img alt='Devsync' src='/pet.png' />
					</div>
					<a
						className='absolute bottom-0 left-0 m-10 text-contrast/70 text-xl font-main shadow-xs shadow-shade-shadow'
						href='https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet'
						rel='noopener'
						target='_blank'
					>
						@Brand art by Natali Chavez
					</a>
				</section>
				<section
					className='flex items-center justify-center my-10'
					id='Feature'
				>
					<div className='flex-1'>
						<img alt='Devsync' src='/pet.png' />
					</div>
					<div className='flex-1'>
						<h2 className='text-3xl font-bold mb-6'>
							Less stuff and better solutions
						</h2>
						<ul className='flex flex-col gap-2'>{featureItems}</ul>
					</div>
				</section>
				<section
					className='h-screen flex items-center justify-center'
					id='About'
				>
					<h2 className='text-6xl font-bold'>About Section</h2>
				</section>
			</main>
		</div>
	)
}

export default HomePage
