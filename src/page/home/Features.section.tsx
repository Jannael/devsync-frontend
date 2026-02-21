import { CheckIcon } from '../../Icon'

const features = [
	'Easy to use',
	'Solution tracking',
	'Task management',
	'Documenter role',
]

function FeaturesSection() {
	const featureItems = features.map((feature) => {
		return (
			<li
				className='flex items-center gap-3 md:gap-5 [&>svg]:text-txt text-lg md:text-2xl text-txt/80'
				key={feature}
			>
				<div className='size-10 flex items-center justify-center rounded-full text-contrast'>
					<CheckIcon />
				</div>
				<p>{feature}</p>
			</li>
		)
	})

	return (
		<section
			className='flex flex-col md:flex-row items-center justify-center mt-10 md:mt-30 bg-primary rounded-xl p-10 gap-10'
			id='Feature'
		>
			<div className='flex-1 flex justify-center'>
				<img
					alt='Devsync'
					className='w-4/5 md:w-full max-w-sm md:max-w-none'
					src='/MainPage.webp'
				/>
			</div>
			<div className='flex-1 text-center md:text-left'>
				<h2 className='text-2xl md:text-3xl font-bold mb-6'>
					Less stuff and better solutions
				</h2>
				<ul className='flex flex-col gap-2 items-center md:items-start'>
					{featureItems}
				</ul>
			</div>
		</section>
	)
}

export default FeaturesSection
