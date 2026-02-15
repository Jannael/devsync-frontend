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
				className='flex items-center gap-5 [&>svg]:text-contrast text-2xl text-contrast/80'
				key={feature}
			>
				<CheckIcon />
				<p>{feature}</p>
			</li>
		)
	})

	return (
		<section
			className='flex items-center justify-center mt-30 bg-shade rounded-xl'
			id='Feature'
		>
			<div className='flex-1'>
				<img alt='Devsync' src='/pet.png' />
			</div>
			<div className='flex-1'>
				<h2 className='text-3xl font-bold mb-6'>
					Less stuff and better solutions
				</h2>
				<ul className='flex flex-col gap-2'>{featureItems}</ul>
			</div>
		</section>
	)
}

export default FeaturesSection
