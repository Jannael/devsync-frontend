import { useEffect, useState } from 'react'

function useNavBar(
	navItems: { label: string; icon: React.ReactNode }[],
	activeSectionProp?: string,
	cb?: (section: string) => void,
) {
	const [activeSection, setActiveSection] = useState('Home')

	useEffect(() => {
		const sections = navItems.map((item) => document.getElementById(item.label))

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
						if (cb) cb(entry.target.id)
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
	}, [navItems, cb])

	return { activeSection: activeSectionProp || activeSection }
}

function Navbar({
	navItems,
	cb,
	activeSection,
}: {
	navItems: { label: string; icon: React.ReactNode }[]
	cb?: (section: string) => void
	activeSection?: string
}) {
	const { activeSection: currentActiveSection } = useNavBar(
		navItems,
		activeSection,
		cb,
	)

	const items = navItems.map((item) => {
		return (
			<NavbarItem
				active={currentActiveSection === item.label}
				icon={item.icon}
				key={item.label}
				onClick={() => cb?.(item.label)}
			>
				{item.label}
			</NavbarItem>
		)
	})

	return (
		<nav className='flex w-full items-center justify-center font-main mt-5 lg:mt-10 fixed top-0 left-0 z-50 px-4'>
			<ul className='flex text-sm lg:text-xl gap-2 lg:gap-4 shadow-xl rounded-full p-1 lg:p-2 bg-main text-txt shadow-primary-shadow transition-all duration-300'>
				{items}
			</ul>
		</nav>
	)
}

export function NavbarItem({
	children,
	icon,
	active,
	onClick,
}: {
	children: React.ReactNode
	icon: React.ReactNode
	active: boolean
	onClick?: () => void
}) {
	return (
		<li className='w-fit' onClick={onClick}>
			<a
				className={`py-1 px-2 md:py-2 md:px-3 rounded-full text-center transition-all duration-300 cursor-pointer flex items-center gap-1 md:gap-2 justify-center ${
					active ? 'bg-primary text-txt' : 'hover:bg-shade hover:text-accent'
				}`}
				href={`#${children}`}
			>
				{icon}
				{children}
			</a>
		</li>
	)
}

export default Navbar
