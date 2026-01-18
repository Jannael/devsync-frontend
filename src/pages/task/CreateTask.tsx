import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Toaster, toast } from 'sonner'
import Button from '../../components/ui/Button'
import Form from '../../components/ui/Form'
import FormButton from '../../components/ui/FormButton'
import InputText from '../../components/ui/InputText'
import Label from '../../components/ui/Label'
import Option from '../../components/ui/Option'
import Page from '../../components/ui/Page'
import Select from '../../components/ui/Select'
import Textarea from '../../components/ui/Textarea'
import Title from '../../components/ui/Title'
import Wrapper, { WrapperItem } from '../../components/Wrapper'
import { Check, X } from '../../icons'
import { routesConst } from '../../routes.constants'
import GroupModel from '../../service/api/models/group/model'
import taskModel from './../../service/api/models/task/model'
import TaskValidation from '../../service/TaskValidation'
import queryKeys from '../../queryKeys'

function CreateTask() {
	const UserSelectRef = useRef<HTMLSelectElement>(null)
	const FeaturesRef = useRef<HTMLInputElement>(null)

	const [users, setUsers] = useState<string[]>()
	const [features, setFeatures] = useState<string[]>()

	const [searchParams] = useSearchParams()

	const {
		data: groupQuery,
		isError,
		error,
	} = useQuery({
		queryFn: ({ signal, queryKey }) => {
			const [_, groupId] = queryKey
			if (groupId === null) return
			return GroupModel.get({ signal, _id: groupId })
		},
		queryKey: [
			queryKeys.groupDetail(searchParams.get('groupId') || ''),
			searchParams.get('groupId'),
		],
		retry: 1
	})

	const memberAndTechLeadAccount = [
		...(groupQuery?.result.techLead?.map(
			(tl: { account: string }) => tl.account,
		) || []),
		...(groupQuery?.result.member?.map((m: { account: string }) => m.account) ||
			[]),
	]

	const createTask = useMutation({
		mutationFn: taskModel.create,
		onSuccess: () => {
			window.location.href = `${routesConst.group}?groupId=${searchParams.get('groupId')}`
		},
	})

	if (isError) toast.error(error.message)

	return (
		<Page className='flex p-4 justify-center items-center'>
			<Toaster />
			<Form
				className='flex flex-row flex-wrap w-full max-w-7xl'
				onSubmit={(e) => {
					e.preventDefault()
					const formData = new FormData(e.currentTarget)
					const data = Object.fromEntries(formData.entries())

					const isValid = TaskValidation({
						groupId: searchParams.get('groupId')!,
						user: users || undefined,
						name: data.name?.toString(),
						code:
							data.code
								? {
										language: 'js',
										content: data.code,
									}
								: undefined,
						feature: features,
						description: data.description?.toString(),
						isComplete: Boolean(data.isComplete?.toString()),
						priority: Number(data.priority?.toString()),
					})
					if (typeof isValid === 'string') {
						toast.error(isValid)
						return
					}

					createTask.mutate(isValid)
				}}
			>
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
								{memberAndTechLeadAccount.map((account) => {
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
						<Select name='isComplete'>
							<Option value='false'>No</Option>
							<Option value='true'>Yes</Option>
						</Select>
					</Label>
					<Label>
						Priority
						<Select name='priority'>
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
					<FormButton block={createTask.isPending} className='mt-3'>
						Create task
					</FormButton>
				</div>
				<div className='flex-3 flex flex-col gap-3'>
					<Label>
						Name
						<InputText name='name' placeholder='validate inputs' />
					</Label>
					<Label>
						Description
						<Textarea
							className='min-h-24'
							name='description'
							placeholder='there is an use when ...'
						/>
					</Label>
					<div className='flex w-full gap-3'>
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
						<Label className='w-6/10'>
							Code
							<Textarea
								className='h-full'
								name='code'
								placeholder='function hello() {}'
							></Textarea>
						</Label>
					</div>
				</div>
			</Form>
		</Page>
	)
}

export default CreateTask
