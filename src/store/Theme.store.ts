import { create } from 'zustand'

export const accentColors = [
	'#00ffaa',
	'#00ff80',
	'#222222',
	'#333333',
	'#444444',
] as const
export const bgShades = [
	'#006142',
	'#00ffae10',
	'#222222',
	'#333333',
	'#444444',
] as const
export const primaryColors = [
	'#03c584',
	'#00af77',
	'#222222',
	'#333333',
	'#444444',
] as const

interface ThemeStore {
	isDarkTheme: boolean
	accentColor: (typeof accentColors)[number]
	bgShade: (typeof bgShades)[number]
	primaryColor: (typeof primaryColors)[number]
	setTheme: (theme: 'light' | 'dark') => void
	setAccentColor: (color: (typeof accentColors)[number]) => void
	setBgShade: (shade: (typeof bgShades)[number]) => void
	setPrimaryColor: (color: (typeof primaryColors)[number]) => void
}

export const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const useThemeStore = create<ThemeStore>((set) => ({
	isDarkTheme: systemTheme, // for images constants

	// default accent color for dark - light
	accentColor: systemTheme ? '#00ffaa' : '#00ff80',
	// default bg shade for dark - light
	bgShade: systemTheme ? '#006142' : '#00ffae10',
	// default primary color for dark - light
	primaryColor: systemTheme ? '#00af77' : '#03c584',

	setTheme: (theme) => set({ isDarkTheme: theme === 'dark' }),
	setAccentColor: (color) => set({ accentColor: color }),
	setBgShade: (shade) => set({ bgShade: shade }),
	setPrimaryColor: (color) => set({ primaryColor: color }),
}))

export default useThemeStore
