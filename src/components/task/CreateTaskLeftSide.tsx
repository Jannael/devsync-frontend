import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import UserInput from '../group/UserInputWrapper'
import FormButton from '../ui/FormButton'
import Label from '../ui/Label'
import Option from '../ui/Option'
import Select from '../ui/Select'

function CreateTaskLeftSide({
	setUsers,
	group,
	users,
	createTask,
}: {
	setUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>
	group: UseQueryResult<any, Error>
	users: string[] | undefined
	createTask: UseMutationResult<
		any,
		Error,
		{
			groupId: string
			user: string[] | undefined
			name: string
			code:
				| {
						language: string
						content: string
				  }
				| undefined
			feature: string[] | undefined
			description: string | undefined
			isComplete: boolean | undefined
			priority: number | undefined
		} & {
			signal?: AbortSignal
		},
		unknown
	>
}) {
	return (
		<div
			className='
						flex-1 flex flex-col
						pr-4
						border-r-2
						gap-2
					'
		>
			<UserInput
				setUsers={setUsers}
				UserAccounts={[
					...(group.data?.result.techLead?.map(
						(tl: { account: string }) => tl.account,
					) || []),
					...(group.data?.result.member?.map(
						(m: { account: string }) => m.account,
					) || []),
				]}
				users={users}
			/>
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
	)
}

export default CreateTaskLeftSide
