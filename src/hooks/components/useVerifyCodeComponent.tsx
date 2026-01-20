import { useState } from 'react'
import { useSearchParams } from 'react-router'
import useRequestCode from '../auth/useRequestCode'
import useVerifyCode from '../auth/useVerifyCode'

function useVerifyCodeComponent() {
	const [verifyCode, setVerifyCode] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams] = useSearchParams()

	const { requestCode } = useRequestCode(() => {
		setVerifyCode(true)
	})

	const { verifyCode: verifyCodeMutation } = useVerifyCode(() => {
		const redirect = searchParams.get('redirect')
		window.location.href = redirect !== null ? redirect : ''
	})

	return { verifyCode, setError, error, requestCode, verifyCodeMutation }
}

export default useVerifyCodeComponent
