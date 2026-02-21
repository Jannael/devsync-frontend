import { useState } from 'react'
import CreateTask from '../component/CreateTask.component'
import EditableTask from '../component/EditableTask.component'
import GroupsMenu from '../component/GroupsMenu.component'
import Navbar from '../component/Navbar.component'
import Task from '../component/Task.component'
import TaskListMenu from '../component/TaskListMenu.component'
import UsersMenu from '../component/UsersMenu.component'
import Toaster from '../component/ui/Toaster.ui'
import useIsMobile from '../hook/useIsMobile.hook'
import { CheckListIcon, ListIcon, TerminalIcon } from '../Icon'
import useTaskStore from '../store/Task.store'

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
	const create = useTaskStore((state) => state.create)
	const edit = useTaskStore((state) => state.edit)

	const sideMenu = create || edit ? <UsersMenu /> : <TaskListMenu />
	const MainComponent = create ? (
		<CreateTask />
	) : edit ? (
		<EditableTask />
	) : (
		<Task />
	)

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
			{!isMobile && (
				<>
					<GroupsMenu />
					{MainComponent}
					{sideMenu}
				</>
			)}
			{isMobile && (
				<>
					{activeSection === 'Groups' && <GroupsMenu />}
					{activeSection === 'Task' && MainComponent}
					{activeSection === 'Tasks' && sideMenu}
				</>
			)}
		</div>
	)
}

export default Main
