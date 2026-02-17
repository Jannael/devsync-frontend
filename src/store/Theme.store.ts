import { create } from 'zustand'
import {
	type accentColors,
	type bgShades,
	defaultTheme,
	type primaryColors,
	systemTheme,
} from '../constant/Theme.constant'

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

	accentColor: currentAccentColor as (typeof accentColors)[number],
	bgShade: currentBgShade as (typeof bgShades)[number],
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
