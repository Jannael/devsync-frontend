import { create } from 'zustand'

interface MainState {
	currentGroup: string | null
	currentTask: string | null
	currentRole: string | null
	setCurrentGroup: (group: string) => void
	setCurrentTask: (task: string) => void
	setCurrentRole: (role: string) => void
}

const useMainStore = create<MainState>((set) => ({
	currentGroup: null,
	currentTask: null,
	currentRole: null,
	setCurrentGroup: (group) => set({ currentGroup: group }),
	setCurrentTask: (task) => set({ currentTask: task }),
	setCurrentRole: (role) => set({ currentRole: role }),
}))

export default useMainStore
