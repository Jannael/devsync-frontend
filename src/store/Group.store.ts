import { create } from 'zustand'

interface GroupState {
	showInviteMemberModal: boolean
	setShowInviteMemberModal: (value: boolean) => void
}

export const useGroupStore = create<GroupState>((set) => ({
	showInviteMemberModal: false,
	setShowInviteMemberModal: (value) => set({ showInviteMemberModal: value }),
}))
