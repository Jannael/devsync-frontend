import { useRef, useState } from 'react'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import P from '../../components/ui/P'
import Page from '../../components/ui/Page'
import Textarea from '../../components/ui/Textarea'
import Title from '../../components/ui/Title'
import Wrapper, { WrapperItem } from '../../components/Wrapper'
import { Check, X } from '../../icons'

function SolveTask() {
	// cspell:disable-next-line
	const taskId = 'ransoajsdnadbiad'
	const [feature, setFeature] = useState<string[]>(['feat'])
	const featureRef = useRef<HTMLInputElement>(null)

	return (
		<Page className='flex justify-center items-center'>
			<Form className='w-6/10 max-w-xl'>
				<Title>Solve task</Title>
				<P>{`taskId = ${taskId}`}</P>
				<Label>
					Description
					<Textarea></Textarea>
				</Label>
				<div className='flex flex-wrap w-full gap-3'>
					<Label className='flex-3'>
						Features
						<InputText placeholder='1. register user...' ref={featureRef} />
					</Label>
					<Label className='flex-1 flex justify-center items-center'>
						Save feature
						<Button
							onClick={() => {
								if (feature?.includes(featureRef.current!.value)) return
								setFeature((current) => {
									return [...(current || []), featureRef.current!.value]
								})
							}}
						>
							<Check />
						</Button>
					</Label>
					<Wrapper className='w-full' title='Features'>
						{/* WrapperItem => this is a li keep it in mind */}
						{feature?.map((feat) => {
							return (
								<WrapperItem
									className='
										flex
										truncate items-center justify-between
									'
									key={feat}
								>
									{feat}
									<button
										className='
											text-red-500
											border-red-500 border-2
											cursor-pointer
										'
										onClick={() => {
											const newFeatures = feature.filter(
												(current) => current !== feat,
											)
											setFeature(newFeatures)
										}}
										type='button'
									>
										<X />
									</button>
								</WrapperItem>
							)
						})}
					</Wrapper>
				</div>

				<div className='w-full'>
					<Label>
						Code
						<Textarea className='min-h-50'></Textarea>
					</Label>
				</div>

				<FormButton>Solve task</FormButton>
			</Form>
		</Page>
	)
}

export default SolveTask
