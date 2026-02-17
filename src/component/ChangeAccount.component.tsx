import { useState } from 'react'
import { useRequestChangeAccount } from '../hook/mutation/auth/useRequestChangeAccount.mutation'
import { useVerifyChangeAccount } from '../hook/mutation/auth/useVerifyChangeAccount.mutation'
import { useDangerZoneStore } from '../store/DangerZone.store'
import GetFormData from '../utils/GetFormData.utils'
import AccountValidator from '../validator/fields/Account.validator'
import Button from './ui/Button.ui'
import Form from './ui/Form.ui'
import Input from './ui/Input.ui'
import Label from './ui/Label.ui'
import P from './ui/P.ui'
import Title from './ui/Title.ui'
import Warning from './ui/Warning.ui'

function UpdateAccount() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const changeAccountMutation = useRequestChangeAccount()
	const verifyChangeAccountMutation = useVerifyChangeAccount()

	const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = GetFormData(e)
		const isValidAccount = AccountValidator({ account: data.newAccount })
		if (!isValidAccount) {
			setError('Invalid account')
			return
		}

		const res = await changeAccountMutation.mutateAsync({
			newAccount: data.newAccount,
		})

		if (res) setVerifyCode(true)
	}

	const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = GetFormData(e)

		const res = await verifyChangeAccountMutation.mutateAsync({
			codeCurrentAccount: data.currentAccountCode,
			codeNewAccount: data.newAccountCode,
		})

		if (res) useDangerZoneStore.setState({ showUpdateAccountModal: false })
	}

	return !verifyCode ? (
		<Form className='border-warning' onSubmit={handleRequestCode}>
			<Title>Update account</Title>
			<P>
				This action will update the account linked to this devsync profile, this
				will also close all your current sessions
			</P>
			<Label id='newAccount'>New account</Label>
			<Input
				id='newAccount'
				name='newAccount'
				placeholder='example@gmail.com'
				type='text'
				variant='destructive'
			/>

			{error && <Warning message={error} />}
			<Button
				block={changeAccountMutation.isPending}
				type='submit'
				variant='destructive'
			>
				Update Account
			</Button>
		</Form>
	) : (
		<Form className='border-warning' onSubmit={handleVerifyCode}>
			<Title>Verify code</Title>
			<P>We have sent a code to your current and new account</P>

			<Label id='currentAccountCode'>Current account code</Label>
			<Input
				id='currentAccountCode'
				name='currentAccountCode'
				placeholder='1234'
				type='text'
				variant='destructive'
			/>

			<Label id='newAccountCode'>New account code</Label>
			<Input
				id='newAccountCode'
				name='newAccountCode'
				placeholder='1234'
				type='text'
				variant='destructive'
			/>

			{error && <Warning message={error} />}
			<Button
				block={
					verifyChangeAccountMutation.isPending ||
					changeAccountMutation.isPending
				}
				type='submit'
				variant='destructive'
			>
				Verify
			</Button>
		</Form>
	)
}

export default UpdateAccount
