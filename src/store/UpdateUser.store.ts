import { create } from 'zustand'

interface UpdateUserStore {
	showUpdateModal: boolean
	showChangeAccountModal: boolean
	showDeleteAccountModal: boolean
	setShowUpdateModal: (show: boolean) => void
	setShowChangeAccountModal: (show: boolean) => void
	setShowDeleteAccountModal: (show: boolean) => void
}

const useUpdateUserStore = create<UpdateUserStore>((set) => ({
	showUpdateModal: false,
	showChangeAccountModal: false,
	showDeleteAccountModal: false,
	setShowUpdateModal: (show) => set({ showUpdateModal: show }),
	setShowChangeAccountModal: (show) => set({ showChangeAccountModal: show }),
	setShowDeleteAccountModal: (show) => set({ showDeleteAccountModal: show }),
}))

export default useUpdateUserStore
