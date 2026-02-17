import ColorPicker from '../component/ui/ColorPicker.ui'
import Label from '../component/ui/Label.ui'
import Select from '../component/ui/Select.ui'
import {
	accentColors,
	bgShades,
	primaryColors,
	systemTheme,
} from '../constant/Theme.constant'
import useThemeStore from '../store/Theme.store'

function AppearanceSection() {
	const {
		accentColor,
		bgShade,
		primaryColor,
		setAccentColor,
		setBgShade,
		setPrimaryColor,
		setTheme,
	} = useThemeStore()

	const handleChangeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = e.target.value
		if (selected === 'system') {
			setTheme(systemTheme)
		} else {
			setTheme(selected as 'dark' | 'light')
		}
	}

	const handleChangeAccentColor = (color: string) => {
		setAccentColor(color as (typeof accentColors)[number])
	}

	const handleChangeBgShade = (color: string) => {
		setBgShade(color as (typeof bgShades)[number])
	}

	const handleChangePrimaryColor = (color: string) => {
		setPrimaryColor(color as (typeof primaryColors)[number])
	}

	const selectOptions = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
	]

	const selectItems = selectOptions.map((option) => (
		<option key={option.value} value={option.value}>
			{option.label}
		</option>
	))

	return (
		<section className='flex gap-8 flex-col px-8 border-primary border-2 rounded-xl py-6'>
			<h2 className='text-2xl font-bold'>Appearance</h2>
			<div className='flex flex-col gap-4'>
				<Label id='theme-select'>Theme</Label>
				<Select id='theme-select' onChange={handleChangeTheme}>
					{selectItems}
				</Select>
			</div>
			<ColorPicker
				colors={accentColors}
				currentColor={accentColor}
				label='Accent Color'
				onClick={handleChangeAccentColor}
			/>
			<ColorPicker
				colors={bgShades}
				currentColor={bgShade}
				label='Background Shade'
				onClick={handleChangeBgShade}
			/>
			<ColorPicker
				colors={primaryColors}
				currentColor={primaryColor}
				label='Primary Color'
				onClick={handleChangePrimaryColor}
			/>
		</section>
	)
}

export default AppearanceSection
