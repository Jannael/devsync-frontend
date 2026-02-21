import useThemeStore from '../store/Theme.store'

const isDarkTheme = useThemeStore.getState().isDarkTheme

export const fullLogo = isDarkTheme ? '/full logo - Dark.png' : '/full logo.png'

export const simplifiedLogo = isDarkTheme
	? '/simplified logo - Dark.png'
	: '/simplified logo.png'

export const pet = '/pet.png'
