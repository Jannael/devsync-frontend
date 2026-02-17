import { create } from 'zustand'

const accentColors = ['#000000', '#111111', '#222222', '#333333', '#444444'] as const
const bgShades = ['#000000', '#111111', '#222222', '#333333', '#444444'] as const

interface ThemeStore {
	isDarkTheme: boolean
	accentColor: typeof accentColors[number]
	bgShade: typeof bgShades[number]
	setTheme: (theme: 'light' | 'dark') => void
	setAccentColor: (color: typeof accentColors[number]) => void
	setBgShade: (shade: typeof bgShades[number]) => void
}

const useThemeStore = create<ThemeStore>((set) => ({
	isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
	accentColor: '#000000',
	bgShade: '#000000',
	setTheme: (theme) => set({ isDarkTheme: theme === 'dark' }),
	setAccentColor: (color) => set({ accentColor: color }),
	setBgShade: (shade) => set({ bgShade: shade }),
}))

export default useThemeStore
