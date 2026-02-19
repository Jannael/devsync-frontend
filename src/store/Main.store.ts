import { create } from 'zustand'

interface MainState {
	currentGroup: string | null
	currentTask: string | null
	currentRole: string | null
	currentTaskIsCompleted: boolean

	showCreateGroupModal: boolean
	showJoinModal: boolean

	setCurrentGroup: (group: string) => void
	setCurrentTask: (task: string) => void
	setCurrentRole: (role: string) => void
	setCurrentTaskIsCompleted: (completed: boolean) => void

	setShowCreateGroupModal: (show: boolean) => void
	setShowJoinModal: (show: boolean) => void
}

const useMainStore = create<MainState>((set) => ({
	currentGroup: null,
	currentTask: null,
	currentRole: null,
	currentTaskIsCompleted: false,

	showCreateGroupModal: false,
	showJoinModal: false,

	setCurrentGroup: (group) => set({ currentGroup: group }),
	setCurrentTask: (task) => set({ currentTask: task }),
	setCurrentRole: (role) => set({ currentRole: role }),
	setCurrentTaskIsCompleted: (completed) =>
		set({ currentTaskIsCompleted: completed }),

	setShowCreateGroupModal: (show) => set({ showCreateGroupModal: show }),
	setShowJoinModal: (show) => set({ showJoinModal: show }),
}))

export default useMainStore
