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

const thanks = [
	{
		label: 'Natali Chavez',
		href: 'https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet',
	},
	{
		label: 'Tabler icons',
		href: 'https://tablericons.com',
	},
	{
		label: 'Npmx',
		href: 'https://npmx.dev',
	},
	{
		label: 'Zustand',
		href: 'https://zustand-demo.pmnd.rs/',
	},
	{
		label: 'CubeDesk',
		href: 'https://cubedesk.io',
	},
	{
		label: 'Tailwindcss',
		href: 'https://tailwindcss.com',
	},
]

const personal = [
	{
		label: 'Github',
		href: 'https://github.com/jannael',
	},
	{
		label: '@JannaelCode',
		href: 'https://twitter.com/JannaelCode',
	},
	{
		label: 'Linkedin',
		href: 'https://www.linkedin.com/in/jannael-orlando-44604a349/',
	},
]

function HomePage() {
	const featureItems = features.map((feature) => {
		return (
			<li
				className='flex items-center gap-5 [&>svg]:text-contrast text-2xl text-contrast/80'
				key={feature}
			>
				<CheckIcon />
				<p>{feature}</p>
			</li>
		)
	})

	const personalItems = personal.map((personal) => {
		return (
			<li
				className='flex items-center gap-5 [&>svg]:text-shade text-2xl text-contrast/80 font-main font-bold'
				key={personal.label}
			>
				<a href={personal.href} rel='noopener' target='_blank'>
					{personal.label}
				</a>
			</li>
		)
	})

	const thanksItems = thanks.map((thank) => {
		return (
			<li
				className='flex items-center gap-5 [&>svg]:text-shade text-2xl text-contrast/80 font-main font-bold'
				key={thank.label}
			>
				<a href={thank.href} rel='noopener' target='_blank'>
					{thank.label}
				</a>
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
							className='px-6 py-4 bg-shade w-fit rounded-full text-xl mt-3 hover:bg-accent transition-all duration-300 font-main'
							to={ROUTES.MAIN}
						>
							Try now
						</Link>
					</div>
					<div className='flex gap-2 flex-1'>
						<img alt='Devsync' src='/pet.png' />
					</div>
				</section>
				<section
					className='flex items-center justify-center mt-30 bg-shade rounded-xl'
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
					className='my-60 flex items-center justify-center flex-col'
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
							className='text-shade hover:text-accent transition-all duration-300'
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
							className='text-shade hover:text-accent transition-all duration-300'
							href='https://cubedesk.io'
						>
							CubeDesk,{' '}
						</a>
						<a
							className='text-shade hover:text-accent transition-all duration-300'
							href='https://npmx.dev'
						>
							Npmx{' '}
						</a>{' '}
						and{' '}
						<a
							className='text-shade hover:text-accent transition-all duration-300'
							href='https://zustand-demo.pmnd.rs/'
						>
							zustand
						</a>
						<br />
						Brand art by{' '}
						<a
							className='text-shade hover:text-accent transition-all duration-300'
							href='https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet'
							rel='noopener'
							target='_blank'
						>
							Natali Chavez
						</a>
					</p>
				</section>
			</main>
			<footer className='w-full bg-shade flex flex-col justify-center items-center py-6 bottom-0'>
				<div>
					<ul className='flex gap-4 font-main text-xl border-b-2 py-5'>
						{thanksItems}
					</ul>
				</div>
				<div>
					<ul className='flex gap-4 font-main text-xl mt-3'>{personalItems}</ul>
				</div>
			</footer>
		</div>
	)
}

export default HomePage
