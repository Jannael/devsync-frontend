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

export const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
	.matches
	? 'dark'
	: 'light'
const currentAccentColor = localStorage.getItem('accentColor')
	? localStorage.getItem('accentColor')
	: systemTheme === 'dark'
		? '#00ffaa'
		: '#00ff80'
const currentBgShade = localStorage.getItem('shade')
	? localStorage.getItem('shade')
	: systemTheme === 'dark'
		? '#006142'
		: '#00ffae10'
const currentPrimaryColor = localStorage.getItem('primaryColor')
	? localStorage.getItem('primaryColor')
	: systemTheme === 'dark'
		? '#00af77'
		: '#03c584'

const useThemeStore = create<ThemeStore>((set) => ({
	isDarkTheme: systemTheme === 'dark', // for images constants

	// default accent color for dark - light
	accentColor: currentAccentColor as (typeof accentColors)[number],
	// default bg shade for dark - light
	bgShade: currentBgShade as (typeof bgShades)[number],
	// default primary color for dark - light
	primaryColor: currentPrimaryColor as (typeof primaryColors)[number],

	setTheme: (theme) => {
		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
		set({ isDarkTheme: theme === 'dark' })
	},
	setAccentColor: (color) => {
		localStorage.setItem('accentColor', color)
		document.documentElement.style.setProperty('--color-accent', color)
		document.documentElement.style.setProperty(
			'--color-accent-shadow',
			`${color}40`,
		)
		set({ accentColor: color })
	},
	setBgShade: (shade) => {
		localStorage.setItem('shade', shade)
		document.documentElement.style.setProperty('--color-shade', shade)
		document.documentElement.style.setProperty(
			'--color-shade-shadow',
			`${shade}40`,
		)
		set({ bgShade: shade })
	},
	setPrimaryColor: (color) => {
		localStorage.setItem('primaryColor', color)
		document.documentElement.style.setProperty('--color-primary', color)
		document.documentElement.style.setProperty(
			'--color-primary-shadow',
			`${color}40`,
		)
		set({ primaryColor: color })
	},
}))

export default useThemeStore
