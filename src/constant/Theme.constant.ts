const storageTheme = localStorage.getItem('theme')
export const systemTheme: 'dark' | 'light' = (
	storageTheme
		? storageTheme
		: window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
) as 'dark' | 'light'

export const defaultAccentColor = {
	dark: '#00ffaa',
	light: '#00ff80',
}

export const defaultBgShade = {
	dark: '#002111',
	light: '#00ffae10',
}

export const defaultPrimaryColor = {
	dark: '#00af77',
	light: '#03c584',
}

export const defaultTheme = {
	accentColor: defaultAccentColor[systemTheme],
	bgShade: defaultBgShade[systemTheme],
	primaryColor: defaultPrimaryColor[systemTheme],
}

export const accentColorsObj = {
	dark: [
		defaultAccentColor.dark,
		'#FF0055',
		'#FF9100',
		'#CCFF00',
		'#00FFCC',
		'#007BFF',
		'#CC00FF',
		'#FFFFFF',
	],
	light: [
		defaultAccentColor.light,
		'#E6004D',
		'#D35400',
		'#7BB300',
		'#00A383',
		'#0059B3',
		'#8E00B3',
		'#000000',
	],
} as const

export const bgShadesObj = {
	dark: [
		defaultBgShade.dark,
		'#22000B',
		'#221300',
		'#161C00',
		'#001A14',
		'#000B1A',
		'#14001A',
		'#111111',
	],
	light: [
		defaultBgShade.light,
		'#FFF0F3',
		'#FFF7ED',
		'#FBFFEB',
		'#E6FFFA',
		'#F0F7FF',
		'#FBF2FF',
		'#F5F5F5',
	],
} as const

export const primaryColorsObj = {
	dark: [
		defaultPrimaryColor.dark,
		'#D00043',
		'#E67E00',
		'#A3CC00',
		'#00CC99',
		'#0056B3',
		'#A300CC',
		'#888888',
	],
	light: [
		defaultPrimaryColor.light,
		'#FFB3C6',
		'#FFD19A',
		'#E4FF85',
		'#A6FFEB',
		'#B3D9FF',
		'#EBB3FF',
		'#E0E0E0',
	],
} as const

export const GroupColors: string[] = [
	'#3498DB',
	'#9B59B6',
	'#1ABC9C',
	'#E67E22',
	'#3F51B5',
	'#2ECC71',
	'#673AB7',
	'#E74C3C',
] as const

export const primaryColors = primaryColorsObj[systemTheme]
export const bgShades = bgShadesObj[systemTheme]
export const accentColors = accentColorsObj[systemTheme]

export type AccentColor = (typeof accentColorsObj.dark)[number]
export type BgShade = (typeof bgShadesObj.dark)[number]
export type PrimaryColor = (typeof primaryColorsObj.dark)[number]
