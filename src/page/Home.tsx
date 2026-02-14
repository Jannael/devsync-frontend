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
			<li
				className='flex items-center gap-2 [&>svg]:text-shade text-2xl text-contrast/80'
				key={feature}
			>
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
					className='flex items-center justify-center'
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
					className='my-40 flex items-center justify-center flex-col'
					id='About'
				>
					<h2 className='text-6xl font-bold mb-5'>About</h2>
					<p className='text-2xl text-contrast/70 text-balance'>
						Devsync was designed for personal improvement as developer, because
						it's my first real project, the goal it's to maintain it and keep
						the best experience for users with the tech-skills i have, while
						keeping it open source, if you have suggestions, issues or want to
						contribute please visit the{' '}
						<a
							className='text-accent hover:text-shade transition-all duration-300'
							href='https://github.com/jannael/devsync'
						>
							repository
						</a>
						,
						<br />
						<br />
						The page design, it is inspired by some open source pages i use,
						such as{' '}
						<a
							className='text-accent hover:text-shade transition-all duration-300'
							href='https://cubedesk.io'
						>
							CubeDesk,{' '}
						</a>
						<a
							className='text-accent hover:text-shade transition-all duration-300'
							href='https://npmx.dev'
						>
							Npmx{' '}
						</a>{' '}
						and{' '}
						<a
							className='text-accent hover:text-shade transition-all duration-300'
							href='https://zustand-demo.pmnd.rs/'
						>
							zustand
						</a>
						, Illustrations are made by{' '}
						<a
							className='text-accent hover:text-shade transition-all duration-300'
							href='https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet'
							rel='noopener'
							target='_blank'
						>
							Natali Chavez
						</a>
					</p>
				</section>
			</main>
		</div>
	)
}

export default HomePage
