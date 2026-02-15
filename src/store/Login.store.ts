import { create } from 'zustand'

interface LoginStore {
	show: 'login' | 'signup' | 'forgot-password'
	setShow: (show: 'login' | 'signup' | 'forgot-password') => void
}

const useLoginStore = create<LoginStore>((set) => ({
	show: 'login',
	setShow: (show) => set({ show }),
}))

export default useLoginStore
