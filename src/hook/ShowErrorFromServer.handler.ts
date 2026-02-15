import { toast } from 'sonner'

function useShowErrorFromServer({
	isError,
	error,
}: {
	isError: boolean
	error: Error | null
}) {
	if (isError) {
		toast.error(error?.message || 'ServerError, please try again')
	}
}
export default useShowErrorFromServer
