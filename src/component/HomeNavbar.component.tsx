import { useEffect, useState } from 'react'

function useHomeNavBar(navItems: { label: string; icon: React.ReactNode }[]) {
	const [activeSection, setActiveSection] = useState('Home')

	useEffect(() => {
		const sections = navItems.map((item) => document.getElementById(item.label))

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{
				threshold: 0,
				rootMargin: '-50% 0px -50% 0px',
			},
		)

		for (const section of sections) {
			if (section) observer.observe(section)
		}

		return () => {
			for (const section of sections) {
				if (section) observer.unobserve(section)
			}
		}
	}, [navItems])

	return { activeSection }
}

function HomeNavbar({
	navItems,
}: {
	navItems: { label: string; icon: React.ReactNode }[]
}) {
	const { activeSection } = useHomeNavBar(navItems)

	const items = navItems.map((item) => {
		return (
			<HomeNavbarItem
				active={activeSection === item.label}
				icon={item.icon}
				key={item.label}
			>
				{item.label}
			</HomeNavbarItem>
		)
	})

	return (
		<nav className='flex w-full items-center justify-center font-main mt-5 md:mt-10 fixed top-0 left-0 z-50 px-4'>
			<ul className='flex text-sm md:text-xl gap-2 md:gap-4 shadow-xl rounded-full p-2 md:p-3 bg-main text-contrast shadow-primary-shadow transition-all duration-300'>
				{items}
			</ul>
		</nav>
	)
}

export function HomeNavbarItem({
	children,
	icon,
	active,
}: {
	children: React.ReactNode
	icon: React.ReactNode
	active: boolean
}) {
	return (
		<li>
			<a
				className={`py-1 px-2 md:py-2 md:px-3 rounded-full text-center transition-all duration-300 cursor-pointer flex items-center gap-1 md:gap-2 justify-center ${
					active
						? 'bg-primary text-contrast'
						: 'hover:bg-shade hover:text-accent'
				}`}
				href={`#${children}`}
			>
				{icon}
				{children}
			</a>
		</li>
	)
}

export default HomeNavbar
