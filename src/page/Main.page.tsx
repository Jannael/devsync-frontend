import { useState } from 'react'
import GroupsMenu from '../component/GroupsMenu.component'
import Navbar from '../component/Navbar.component'
import Toaster from '../component/ui/Toaster.ui'
import useIsMobile from '../hook/useIsMobile.hook'
import { CheckListIcon, ListIcon, TerminalIcon } from '../Icon'

// this is the plan for this page, this page its gonna hve 3 components, the group and invitation list, the current task, and the tasks list, the issue? mobile responsive, that is 2 different menus, with a big component in the middle, so i come up with the next idea, i am going to use, the navbar component to show one at a time in mobile, and only show the selected component, and in desktop show all of them.

//first empty container just the layout

const navItems = [
	{ label: 'Groups', icon: <TerminalIcon /> },
	{ label: 'Task', icon: <CheckListIcon /> },
	{ label: 'Tasks', icon: <ListIcon /> },
]

function Main() {
	const isMobile = useIsMobile()
	const [activeSection, setActiveSection] = useState('Groups')

	const Sections = () => {
		return (
			<>
				<GroupsMenu />
				<div className='flex-3 h-full bg-red-800' id='Task'></div>
				<div className='flex-1 h-full bg-blue-800' id='Tasks'></div>
			</>
		)
	}

	const CurrentSection = () => {
		return (
			<>
				{activeSection === 'Groups' && <GroupsMenu />}
				{activeSection === 'Task' && (
					<div className='flex-3 h-full bg-red-800' id='Task'></div>
				)}
				{activeSection === 'Tasks' && (
					<div className='flex-1 h-full bg-blue-800' id='Tasks'></div>
				)}
			</>
		)
	}

	return (
		<div
			className={`flex h-screen w-screen text-txt bg-main ${isMobile ? 'pt-18' : ''}`}
		>
			<Toaster />
			{isMobile && (
				<Navbar
					cb={(section) => setActiveSection(section)}
					navItems={navItems}
				/>
			)}
			{!isMobile && <Sections />}
			{isMobile && <CurrentSection />}
		</div>
	)
}

export default Main
