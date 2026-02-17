import HomeNavbar from '../../component/HomeNavbar.component'
import { AboutIcon, FeaturesIcon, HomeIcon } from '../../Icon'
import About from './About.section'
import FeaturesSection from './Features.section'
import Footer from './Footer'
import HeroSection from './Hero.section'

const NAV_ITEMS = [
	{ label: 'Home', icon: <HomeIcon /> },
	{ label: 'Feature', icon: <FeaturesIcon /> },
	{ label: 'About', icon: <AboutIcon /> },
]

function HomePage() {
	return (
		<div className='bg-main text-txt min-h-screen font-main'>
			<HomeNavbar navItems={NAV_ITEMS} />
			<main className='flex flex-col max-w-7xl mx-auto px-6 md:px-0'>
				<HeroSection />
				<FeaturesSection />
				<About />
			</main>
			<Footer />
		</div>
	)
}

export default HomePage
