import { useRef } from 'react'
import { toast } from 'sonner'
import VerifyCode from '../component/auth/VerifyCode.component'
import Overlay from '../component/ui/Overlay.ui'
import UpdateTextInput from '../component/ui/UpdateTextInput.ui'
import { useRequestCode } from '../hook/mutation/auth/useRequestCode.mutation'
import { useVerifyCode } from '../hook/mutation/auth/useVerifyCode.mutation'
import { useUpdateUser } from '../hook/mutation/user/useUpdateUser.mutation'
import { useGetUser } from '../hook/query/user/useGetUser.query'
import useUpdateUserStore from '../store/UpdateUser.store'
import GetFormData from '../utils/GetFormData.utils'
import { PasswordValidator } from '../validator/fields/Password.schema'

function UserSection() {
	const updatedUserInfo = useRef({
		fullName: '',
		nickName: '',
		password: '',
	})
	const showUpdateModal = useUpdateUserStore((state) => state.showUpdateModal)
	const setShowUpdateModal = useUpdateUserStore(
		(state) => state.setShowUpdateModal,
	)

	const updateUserMutation = useUpdateUser()
	const requestCodeMutation = useRequestCode()
	const verifyCodeMutation = useVerifyCode()

	const blockUpdateModal =
		requestCodeMutation.isPending ||
		verifyCodeMutation.isPending ||
		updateUserMutation.isPending

	const { data: user } = useGetUser()

	const requestCodeToUpdate = async () => {
		// this takes a while an even for me its kinda like did i press save?, so i will just show the modal, verify btn stays block anyway
		await requestCodeMutation.mutate({
			account: user?.account ?? '',
		})

		setShowUpdateModal(true)
	}

	const verifyAndUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = GetFormData(e)
		const res = await verifyCodeMutation.mutateAsync({
			code: formData.code,
		})
		if (!res) return

		const cleanObj = Object.fromEntries(
			Object.entries(updatedUserInfo.current).filter(([_, value]) =>
				Boolean(value),
			),
		)

		const updatedUser = await updateUserMutation.mutateAsync({
			...cleanObj,
			pwd: cleanObj.password,
		})

		if (!updatedUser) return
		setShowUpdateModal(false)
	}

	const handleUpdatePassword = async (
		val: string,
		cb: (error: string | null) => void,
	) => {
		try {
			PasswordValidator({ password: val })

			updatedUserInfo.current.password = val
			await requestCodeToUpdate()
			cb(null)
		} catch (e) {
			toast.error((e as Error).message)
			cb((e as Error).message)
		}
	}

	const handleUpdateUser = (field: 'fullName' | 'nickName') => {
		return async (val: string, cb: (error: string | null) => void) => {
			try {
				updatedUserInfo.current[field] = val
				await requestCodeToUpdate()
				cb(null)
			} catch (e) {
				toast.error((e as Error).message)
				cb((e as Error).message)
			}
		}
	}

	return (
		<>
			<section className='px-2 md:px-8 flex flex-col gap-6'>
				<UpdateTextInput
					label='Full name'
					onSave={handleUpdateUser('fullName')}
					placeholder={user?.fullName ?? ''}
					value={user?.fullName ?? ''}
				/>
				<UpdateTextInput
					label='Nick name'
					onSave={handleUpdateUser('nickName')}
					placeholder={user?.nickName ?? ''}
					value={user?.nickName ?? ''}
				/>
				<UpdateTextInput
					label='Password'
					onSave={handleUpdatePassword}
					placeholder='Update password, this will close all your other sessions'
					value={''}
				/>
			</section>
			{showUpdateModal && (
				<Overlay setShow={setShowUpdateModal}>
					<VerifyCode
						block={blockUpdateModal}
						error={null}
						onSubmit={verifyAndUpdateUser}
					/>
				</Overlay>
			)}
		</>
	)
}
export default UserSection
