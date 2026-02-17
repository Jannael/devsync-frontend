import { create } from 'zustand'

export const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
	.matches
	? 'dark'
	: 'light'

const defaultAccentColor = {
	dark: '#00ffaa',
	light: '#00ff80',
}
const defaultBgShade = {
	dark: '#006142',
	light: '#00ffae10',
}
const defaultPrimaryColor = {
	dark: '#00af77',
	light: '#03c584',
}
const defaultTheme = {
	accentColor: defaultAccentColor[systemTheme],
	bgShade: defaultBgShade[systemTheme],
	primaryColor: defaultPrimaryColor[systemTheme],
}

export const accentColors = [
	defaultAccentColor.dark,
	defaultAccentColor.light,
	'#FF0055',
	'#FF9100',
	'#CCFF00',
	'#00FFCC',
	'#007BFF',
	'#CC00FF',
	'#FFFFFF',
] as const
export const bgShades = [
	defaultBgShade.dark,
	defaultBgShade.light,
	'#22000B',
	'#221300',
	'#161C00',
	'#001A14',
	'#000B1A',
	'#14001A',
	'#111111',
] as const
export const primaryColors = [
	defaultPrimaryColor.dark,
	defaultPrimaryColor.light,
	'#D00043',
	'#E67E00',
	'#A3CC00',
	'#00CC99',
	'#0056B3',
	'#A300CC',
	'#888888',
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

const currentAccentColor = localStorage.getItem('accentColor')
	? localStorage.getItem('accentColor')
	: defaultTheme.accentColor
const currentBgShade = localStorage.getItem('shade')
	? localStorage.getItem('shade')
	: defaultTheme.bgShade
const currentPrimaryColor = localStorage.getItem('primaryColor')
	? localStorage.getItem('primaryColor')
	: defaultTheme.primaryColor

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
