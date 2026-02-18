import { create } from 'zustand'

interface MainState {
	currentGroup: string | null
	currentTask: string | null
	currentRole: string | null

	showCreateGroupModal: boolean
	showJoinModal: boolean

	setCurrentGroup: (group: string) => void
	setCurrentTask: (task: string) => void
	setCurrentRole: (role: string) => void

	setShowCreateGroupModal: (show: boolean) => void
	setShowJoinModal: (show: boolean) => void
}

const useMainStore = create<MainState>((set) => ({
	currentGroup: null,
	currentTask: null,
	currentRole: null,

	showCreateGroupModal: false,
	showJoinModal: false,

	setCurrentGroup: (group) => set({ currentGroup: group }),
	setCurrentTask: (task) => set({ currentTask: task }),
	setCurrentRole: (role) => set({ currentRole: role }),

	setShowCreateGroupModal: (show) => set({ showCreateGroupModal: show }),
	setShowJoinModal: (show) => set({ showJoinModal: show }),
}))

export default useMainStore
