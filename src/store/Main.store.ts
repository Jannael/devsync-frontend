import { create } from 'zustand'

interface MainState {
	currentGroup: string | null
	currentTask: string | null
	currentRole: string | null
	currentTaskIsCompleted: boolean

	showCreateGroupModal: boolean
	showJoinModal: boolean
	showSolveBtn: boolean

	setCurrentGroup: (group: string) => void
	setCurrentTask: (task: string | null) => void
	setCurrentRole: (role: string) => void

	setShowCreateGroupModal: (show: boolean) => void
	setShowJoinModal: (show: boolean) => void
	setShowSolveBtn: (show: boolean) => void
}

const useMainStore = create<MainState>((set) => ({
	currentGroup: null,
	currentTask: null,
	currentRole: null,
	currentTaskIsCompleted: false,

	showCreateGroupModal: false,
	showJoinModal: false,
	showSolveBtn: false,

	setCurrentGroup: (group) => set({ currentGroup: group }),
	setCurrentTask: (task) => set({ currentTask: task }),
	setCurrentRole: (role) => set({ currentRole: role }),

	setShowCreateGroupModal: (show) => set({ showCreateGroupModal: show }),
	setShowJoinModal: (show) => set({ showJoinModal: show }),
	setShowSolveBtn: (show) => set({ showSolveBtn: show }),
}))

export default useMainStore
