import UserSection from '../component/UserSection.component'
import Button from '../component/ui/Button.ui'
import Header from '../component/ui/Header.ui'
import Label from '../component/ui/Label.ui'
import Toaster from '../component/ui/Toaster.ui'
import { ROUTES } from '../constant/Route.constant'
import { ArrowLeftIcon } from '../Icon'
import useThemeStore, {
	accentColors,
	bgShades,
	primaryColors,
	systemTheme,
} from '../store/Theme.store'

function ColorPicker({
	colors,
	label,
	onClick,
	currentColor,
}: {
	colors: readonly string[]
	label: string
	onClick: (color: string) => void
	currentColor: string
}) {
	return (
		<div className='flex gap-2 justify-between'>
			<Label id={label}>{label}</Label>
			<div className='flex gap-2'>
				{colors.map((color) => (
					<button
						className={`w-8 h-8 rounded-full cursor-pointer border-2
						 ${currentColor === color ? 'border-contrast' : 'border-transparent'}`}
						id={label}
						key={color}
						onClick={() => onClick(color)}
						style={{ backgroundColor: color }}
						type='button'
					/>
				))}
			</div>
		</div>
	)
}

function Settings() {
	const {
		accentColor,
		bgShade,
		primaryColor,
		setAccentColor,
		setBgShade,
		setPrimaryColor,
		setTheme,
	} = useThemeStore()

	return (
		<div className='min-h-dvh bg-main flex justify-center text-txt p-4 font-main'>
			<Toaster />
			<div className='w-full max-w-7xl'>
				<Header>
					<h1 className='text-4xl font-bold'>Settings</h1>
					<Button
						block={false}
						className='flex text-xl justify-center items-center gap-2'
						onClick={() => {
							window.location.href = ROUTES.MAIN
						}}
						type='button'
					>
						Back
						<ArrowLeftIcon />
					</Button>
				</Header>
				<main className='flex gap-8 flex-col'>
					<UserSection />
					<section className='flex gap-8 flex-col px-8 border-primary border-2 rounded-xl py-6'>
						<h2 className='text-2xl font-bold'>Appearance</h2>
						<div className='flex flex-col gap-4'>
							<Label id='theme-select'>Theme</Label>
							<select
								className='bg-main border-primary border-2 rounded-xl px-4 py-2'
								id='theme-select'
								name='theme'
								onChange={(e) => {
									const selected = e.target.value
									if (selected === 'system') {
										setTheme(systemTheme)
									} else {
										setTheme(selected as 'dark' | 'light')
									}
								}}
							>
								<option value='system'>System</option>
								<option value='light'>Light</option>
								<option value='dark'>Dark</option>
							</select>
						</div>
						<ColorPicker
							colors={accentColors}
							currentColor={accentColor}
							label='Accent Color'
							onClick={(color) =>
								setAccentColor(color as (typeof accentColors)[number])
							}
						/>
						<ColorPicker
							colors={bgShades}
							currentColor={bgShade}
							label='Background Shade'
							onClick={(color) =>
								setBgShade(color as (typeof bgShades)[number])
							}
						/>
						<ColorPicker
							colors={primaryColors}
							currentColor={primaryColor}
							label='Primary Color'
							onClick={(color) =>
								setPrimaryColor(color as (typeof primaryColors)[number])
							}
						/>
					</section>
				</main>
			</div>
		</div>
	)
}

export default Settings
