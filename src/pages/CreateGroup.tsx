import ColorPicker from '../components/ui/ColorPicker'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import Page from '../components/ui/Page'
import Title from '../components/ui/Title'
import Wrapper, { WrapperItem } from '../components/Wrapper'
import { CircleMinus } from '../icons'

function CreateGroup() {
	return (
		<Page
			className='
				flex
				justify-center items-center
			'
		>
			<Form>
				<Title>Create group</Title>
				<Label>
					Group name
					<InputText
						className='
							w-full
						'
						placeholder='my group'
					/>
				</Label>
				<Label>
					Repository
					<InputText
						className='
							w-full
						'
						placeholder='https://github...'
					/>
				</Label>
				<Label>
					Color
					<ColorPicker />
				</Label>
				<Label
					className='
						h-fit
					'
				>
					Members
					<Wrapper>
						<WrapperItem>
							<MemberItem
								account='example@gmail.com'
								memberRole='developer'
								onDelete={() => console.log('del')}
							/>
						</WrapperItem>
					</Wrapper>
				</Label>
				<Label>TechLeads</Label>

				<FormButton>Create</FormButton>
			</Form>
		</Page>
	)
}

export function MemberItem({
	account,
	memberRole,
	onDelete,
}: {
	account: string
	memberRole: string
	onDelete: () => void
}) {
	return (
		<output
			className='
				flex
				justify-around items-center gap-3
			'
		>
			<p
				className='
					flex-3/5
					border-r-2
					truncate
				'
			>
				{account}
			</p>
			<p
				className='
					flex-1/5
					text-center
				'
			>
				{memberRole}
			</p>
			<button
				className='
					flex-1/5 flex
					border-l-2
					cursor-pointer
					justify-center items-center
				'
				onClick={onDelete}
				type='button'
			>
				<CircleMinus />
			</button>
		</output>
	)
}

export default CreateGroup
