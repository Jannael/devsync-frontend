import { create } from 'zustand'

// how does this work??
// the components for create or update task or solution are the same
// so instead of handling them as two different components
// we can handle them as one component and use the store to say if it is a create or update and if its isSolution or not

// i name it TaskStore because i think it makes more sense than TaskSolutionStore

interface TaskStore {
	isSolution: boolean
	edit: boolean
	create: boolean
	assignedUser: string[]

	setIsSolution: (isSolution: boolean) => void
	setEdit: (edit: boolean) => void
	setCreate: (create: boolean) => void
	setAssignedUser: (assignedUser: string[]) => void
}

const useTaskStore = create<TaskStore>((set) => ({
	isSolution: false,
	edit: false,
	create: false,
	assignedUser: [],

	setIsSolution: (isSolution: boolean) => set({ isSolution }),
	setEdit: (edit: boolean) => set({ edit }),
	setCreate: (create: boolean) => set({ create }),
	setAssignedUser: (assignedUser: string[]) => set({ assignedUser }),
}))

export default useTaskStore
