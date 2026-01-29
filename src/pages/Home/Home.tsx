import type { ReactNode } from 'react'
import { Link } from 'react-router'
import Page from '../../components/ui/Page'
import { Check, Github } from '../../icons'
import { routesConst } from '../../routes.constants'
import Navbar from './components/Navbar'

function Home() {
	return (
		<Page className='flex justify-center max-w-7xl flex-col items-center'>
			<Navbar />
			<Section>
				<main className='flex w-full justify-center items-center min-h-dvh'>
					<div className='flex flex-col flex-1 justify-center gap-3'>
						<a
							className='h-fit w-fit mb-3'
							href='https://github.com/jannael/devsync'
						>
							<div className='flex gap-3 bg-black px-5 py-3 rounded-full border-contrast border text-white'>
								<Github />
								Devsync is Open Source
							</div>
						</a>
						<h1 className='text-5xl'>
							Task management and solution tracking for devs
						</h1>
						<p className='text-xl text-contrast/80'>
							The tools you need as a techLead
						</p>
						<Link
							className='border border-contrast px-5 py-3 rounded-full w-fit mt-5'
							to={routesConst.main}
						>
							Try here
						</Link>
					</div>
					<img
						alt='A man with holding a taskBoard'
						className='flex-1'
						src='/HeroImg.webp'
					/>
				</main>
			</Section>
			<Section>
				<div className='size-full flex'>
					<img
						alt='taskList in the right with task details in the left'
						className='flex-3 border-emerald-600 border-5 rounded-xl'
						src='/GroupScreen.webp'
					/>
					<article className='flex-2 pl-10 flex flex-col justify-center'>
						<h2 className='text-3xl mb-6 border-b-4 border-emerald-700 w-fit pb-3'>Features</h2>
						<ul className='flex flex-col gap-4'>
							<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'> <Check /> Code field</li>
							<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'> <Check /> Features field</li>
							<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'> <Check /> Solution tracking</li>
							<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'> <Check /> Task management</li>
							<li className='flex [&>svg]:text-emerald-700/50 gap-3 text-xl'> <Check /> User privileges by role</li>
						</ul>
					</article>
				</div>
			</Section>
		</Page>
	)
}

function Section({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<section
			className={`${className} flex flex-col items-center justify-center w-9/10`}
		>
			{children}
		</section>
	)
}

export default Home
