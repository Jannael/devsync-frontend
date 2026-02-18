import { create } from 'zustand'

interface MainState {
	currentGroup: string | null
	currentTask: string | null
	currentRole: string | null

	showCreateGroupModal: boolean

	setCurrentGroup: (group: string) => void
	setCurrentTask: (task: string) => void
	setCurrentRole: (role: string) => void
	setShowCreateGroupModal: (show: boolean) => void
}

const useMainStore = create<MainState>((set) => ({
	currentGroup: null,
	currentTask: null,
	currentRole: null,

	showCreateGroupModal: false,

	setCurrentGroup: (group) => set({ currentGroup: group }),
	setCurrentTask: (task) => set({ currentTask: task }),
	setCurrentRole: (role) => set({ currentRole: role }),
	setShowCreateGroupModal: (show) => set({ showCreateGroupModal: show }),
}))

export default useMainStore
