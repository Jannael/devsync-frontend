import { useRef, useState } from 'react'
import Button from '../components/ui/Button'
import Form from '../components/ui/Form'
import FormButton from '../components/ui/FormButton'
import InputText from '../components/ui/InputText'
import Label from '../components/ui/Label'
import Option from '../components/ui/Option'
import Page from '../components/ui/Page'
import Select from '../components/ui/Select'
import Textarea from '../components/ui/Textarea'
import Title from '../components/ui/Title'
import Wrapper, { WrapperItem } from '../components/Wrapper'
import { Check, X } from '../icons'

const accounts = ['1', '2', '3']
function CreateTask() {
	const UserSelectRef = useRef<HTMLSelectElement>(null)
	const FeaturesRef = useRef<HTMLInputElement>(null)

	const [users, setUsers] = useState<string[]>()
	const [features, setFeatures] = useState<string[]>()

	return (
		<Page className='flex p-4 justify-center items-center'>
			<Form className='flex flex-row flex-wrap w-full'>
				<Title className='w-full'>Create Task</Title>
				<div
					className='
						flex-1 flex flex-col
						pr-4
						border-r-2
						gap-2
					'
				>
					<div
						className='
							flex flex-wrap
							w-full
							gap-3 items-center justify-between
						'
					>
						<Label className='flex-3'>
							Users
							<Select className='p-2' ref={UserSelectRef}>
								{accounts.map((account) => {
									return <Option key={account}>{account}</Option>
								})}
							</Select>
						</Label>
						<Label className='flex-1'>
							Select User
							<Button
								onClick={() => {
									if (users?.includes(UserSelectRef.current!.value)) return
									setUsers([...(users || []), UserSelectRef.current!.value])
								}}
							>
								Add
							</Button>
						</Label>
						<Wrapper className='w-full' title='Users'>
							{users?.map((user) => {
								return <WrapperItem key={user}>{user}</WrapperItem>
							})}
						</Wrapper>
					</div>
					<Label>
						IsComplete
						<Select>
							<Option value='true'>Yes</Option>
							<Option value='false'>No</Option>
						</Select>
					</Label>
					<Label>
						Priority
						<Select>
							<Option value='1'>1</Option>
							<Option value='2'>2</Option>
							<Option value='3'>3</Option>
							<Option value='4'>4</Option>
							<Option value='5'>5</Option>
							<Option value='6'>6</Option>
							<Option value='7'>7</Option>
							<Option value='8'>8</Option>
							<Option value='9'>9</Option>
							<Option value='10'>10</Option>
						</Select>
					</Label>
					<FormButton className='mt-3'>Create task</FormButton>
				</div>
				<div className='flex-3 flex flex-col gap-3'>
					<Label>
						Name
						<InputText />
					</Label>
					<Label>
						Description
						<Textarea className='min-h-24' />
					</Label>
					<div className='flex w-full'>
						<div className='flex flex-wrap w-4/10 gap-3 items-center'>
							<div className='flex w-full gap-3'>
								<Label className='flex-3'>
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
										className='w-min'
										onClick={() => {
											if (features?.includes(FeaturesRef.current!.value)) return
											setFeatures([
												...(features || []),
												FeaturesRef.current!.value,
											])
										}}
									>
										<Check />
									</Button>
								</Label>
							</div>

							<Wrapper className='w-full' title='Features'>
								{features?.map((feature) => {
									return (
										<WrapperItem
											className='flex items-center justify-between'
											key={feature}
										>
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
								})}
							</Wrapper>
						</div>
					</div>
				</div>
			</Form>
		</Page>
	)
}

export default CreateTask
