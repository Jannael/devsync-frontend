import type { ReactNode } from 'react'
import { Link } from 'react-router'
import Page from '../../components/ui/Page'
import { Github } from '../../icons'
import { routesConst } from '../../routes.constants'
import Navbar from './components/Navbar'

function Home() {
	return (
		<Page className='flex justify-center max-w-7xl'>
			<Navbar />
			<Section>
				<main className='flex w-9/10'>
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
						<Link className='border border-contrast px-5 py-3 rounded-full w-fit mt-5' to={routesConst.main}>
							Try here
						</Link>
					</div>

					<img alt='A man with holding a taskBoard' className='flex-1' src='/HeroImg.webp' />
				</main>
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
			className={`${className} min-h-dvh flex flex-col items-center justify-center`}
		>
			{children}
		</section>
	)
}

export default Home
