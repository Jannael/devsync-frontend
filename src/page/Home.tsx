import HomeNavbar from '../component/HomeNavbar'

function HomePage() {
	return (
		<div className='bg-main text-contrast min-h-screen'>
			<HomeNavbar />
			<main>
				<section
					className='h-screen flex items-center justify-center'
					id='Home'
				>
					<h1 className='text-6xl font-bold'>Home Section</h1>
				</section>
				<section
					className='h-screen flex items-center justify-center'
					id='Feature'
				>
					<h2 className='text-6xl font-bold'>Features Section</h2>
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
