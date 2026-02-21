function About() {
	return (
		<section
			className='my-20 md:my-60 flex items-center justify-center flex-col text-center md:text-balance w-full'
			id='About'
		>
			<h2 className='text-4xl md:text-6xl font-bold mb-5'>About</h2>
			<div className='text-lg md:text-2xl text-txt/70 max-w-4xl'>
				<p className='w-full'>
					Devsync was designed for personal improvement as developer, because
					it's my first real project, the goal it's to maintain it and keep the
					best experience for users with the tech-skills i have, while keeping
					it open source, if you have suggestions, issues or want to contribute
					please visit the{' '}
					<Anchor href='https://github.com/jannael/devsync' name='repository' />
					.
				</p>
				<br />
				<p className='w-full text-balance'>
					The page design, it is inspired by some open source pages i use, such
					as <Anchor href='https://cubedesk.io' name='CubeDesk' />,{' '}
					<Anchor href='https://npmx.dev' name='Npmx' /> and{' '}
					<Anchor href='https://zustand-demo.pmnd.rs/' name='zustand' />.
				</p>
				<br />
				<p>
					Brand art by{' '}
					<Anchor
						href='https://www.instagram.com/nat.chavez18?utm_source=ig_web_button_share_sheet'
						name='Natali Chavez'
					/>
				</p>
			</div>
		</section>
	)
}
export function Anchor({ href, name }: { href: string; name: string }) {
	return (
		<a
			className='text-accent hover:text-accent/70 transition-all duration-300'
			href={href}
			rel='noopener'
			target='_blank'
		>
			{name}
		</a>
	)
}

export default About
