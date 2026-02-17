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

export const defaultTheme = {
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