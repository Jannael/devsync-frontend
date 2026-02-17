import { create } from 'zustand'
import {
	type AccentColor,
	type BgShade,
	defaultAccentColor,
	defaultBgShade,
	defaultPrimaryColor,
	defaultTheme,
	type PrimaryColor,
	systemTheme,
} from '../constant/Theme.constant'

interface ThemeStore {
	isDarkTheme: boolean
	accentColor: AccentColor
	bgShade: BgShade
	primaryColor: PrimaryColor
	setTheme: (theme: 'light' | 'dark') => void
	setAccentColor: (color: AccentColor) => void
	setBgShade: (shade: BgShade) => void
	setPrimaryColor: (color: PrimaryColor) => void
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
	isDarkTheme: (localStorage.getItem('theme') || systemTheme) === 'dark',

	accentColor: currentAccentColor as AccentColor,
	bgShade: currentBgShade as BgShade,
	primaryColor: currentPrimaryColor as PrimaryColor,

	setTheme: (theme) => {
		const accent = defaultAccentColor[theme]
		const shade = defaultBgShade[theme]
		const primary = defaultPrimaryColor[theme]

		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)

		localStorage.setItem('accentColor', accent)
		document.documentElement.style.setProperty('--color-accent', accent)
		document.documentElement.style.setProperty(
			'--color-accent-shadow',
			`${accent}40`,
		)

		localStorage.setItem('shade', shade)
		document.documentElement.style.setProperty('--color-shade', shade)

		localStorage.setItem('primaryColor', primary)
		document.documentElement.style.setProperty('--color-primary', primary)
		document.documentElement.style.setProperty(
			'--color-primary-shadow',
			`${primary}40`,
		)

		set({
			isDarkTheme: theme === 'dark',
			accentColor: accent as AccentColor,
			bgShade: shade as BgShade,
			primaryColor: primary as PrimaryColor,
		})
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
