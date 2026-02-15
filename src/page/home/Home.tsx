import HomeNavbar from '../../component/HomeNavbar'
import { AboutIcon, FeaturesIcon, HomeIcon } from '../../Icon'
import About from './About'
import FeaturesSection from './FeaturesSection'
import Footer from './Footer'
import HeroSection from './HeroSection'

const NAV_ITEMS = [
	{ label: 'Home', icon: <HomeIcon /> },
	{ label: 'Feature', icon: <FeaturesIcon /> },
	{ label: 'About', icon: <AboutIcon /> },
]

function HomePage() {
	return (
		<div className='bg-main text-contrast min-h-screen font-main'>
			<HomeNavbar navItems={NAV_ITEMS} />
			<main className='flex flex-col max-w-7xl mx-auto'>
				<HeroSection />
				<FeaturesSection />
				<About />
			</main>
			<Footer />
		</div>
	)
}

export default HomePage
