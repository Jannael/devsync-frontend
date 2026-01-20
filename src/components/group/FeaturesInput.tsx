import { useRef } from 'react'
import { Check, X } from '../../icons'
import Button from '../ui/Button'
import InputText from '../ui/InputText'
import Label from '../ui/Label'
import Wrapper, { WrapperItem } from '../Wrapper'

function FeaturesInput({
	features,
	setFeatures,
	className,
}: {
	features: string[] | undefined
	className?: string
	setFeatures: React.Dispatch<React.SetStateAction<string[] | undefined>>
}) {
	const FeaturesRef = useRef<HTMLInputElement>(null)
	const featuresItems = features?.map((feature) => {
		return (
			<WrapperItem className='flex items-center justify-between' key={feature}>
				{feature}
				<button
					className='
													text-red-500
													border-red-500 border-2
													cursor-pointer
												'
					onClick={() => {
						const newFeatures = features.filter(
							(current) => current !== feature,
						)
						setFeatures(newFeatures)
					}}
					type='button'
				>
					<X />
				</button>
			</WrapperItem>
		)
	})

	return (
		<div className={`${className} flex flex-wrap gap-3 items-center`}>
			<div className='flex w-full gap-3'>
				<Label className='flex-4'>
					Feature
					<InputText
						className='w-full'
						placeholder='1. Validation...'
						ref={FeaturesRef}
					/>
				</Label>
				<Label className='flex-1'>
					Save
					<Button
						className='w-full flex justify-center items-center'
						onClick={() => {
							if (FeaturesRef.current!.value === '') return
							if (features?.includes(FeaturesRef.current!.value)) return
							setFeatures([...(features || []), FeaturesRef.current!.value])
						}}
					>
						<Check />
					</Button>
				</Label>
			</div>
			<Wrapper className='w-full' title='Features'>
				{featuresItems}
			</Wrapper>
		</div>
	)
}

export default FeaturesInput
