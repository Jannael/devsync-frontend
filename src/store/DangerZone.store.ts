import { create } from 'zustand'

export interface DangerZoneStore {
	showUpdateAccountModal: boolean
	showLogoutModal: boolean
	showDeleteAccountModal: boolean
	setUpdateAccountModal: (value: boolean) => void
	setLogoutModal: (value: boolean) => void
	setDeleteAccountModal: (value: boolean) => void
}

export const useDangerZoneStore = create<DangerZoneStore>((set) => ({
	showUpdateAccountModal: false,
	showLogoutModal: false,
	showDeleteAccountModal: false,

	setUpdateAccountModal: (value: boolean) =>
		set({ showUpdateAccountModal: value }),
	setLogoutModal: (value: boolean) => set({ showLogoutModal: value }),
	setDeleteAccountModal: (value: boolean) =>
		set({ showDeleteAccountModal: value }),
}))
