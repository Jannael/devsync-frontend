function About() {
	return (
		<section
			className='my-60 flex items-center justify-center flex-col'
			id='About'
		>
			<h2 className='text-6xl font-bold mb-5'>About</h2>
			<p className='text-2xl text-contrast/70 text-balance'>
				Devsync was designed for personal improvement as developer, because it's
				my first real project, the goal it's to maintain it and keep the best
				experience for users with the tech-skills i have, while keeping it open
				source, if you have suggestions, issues or want to contribute please
				visit the{' '}
				<a
					className='text-shade hover:text-accent transition-all duration-300'
					href='https://github.com/jannael/devsync'
				>
					repository
				</a>
				,
				<br />
				<br />
				The page design, it is inspired by some open source pages i use, such as{' '}
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
	)
}

export default About
