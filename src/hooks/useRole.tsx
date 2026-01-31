import { roles } from '../memberRoles'
import useGetGroup from './group/useGetGroup'
import useUser from './user/useUser'

function useRole({ groupId }: { groupId: string | null }) {
	const { data: user } = useUser()
	const { group } = useGetGroup({ groupId })
	const isTechLead = group?.data?.result?.techLead?.find(
		(techLead: { account: string }) => {
			return techLead.account === user?.result?.account
		},
	)

	if (isTechLead !== undefined) {
		return {
			isTechLead: true,
			isDeveloper: false,
			isDocumenter: false,
		}
	}

	const isDeveloper = group?.data?.result?.member?.find(
		({ account, role }: { account: string; role: string }) =>
			account === user?.result?.account && role === roles.developer,
	)

	if (isDeveloper) {
		return {
			isTechLead: false,
			isDeveloper: true,
			isDocumenter: false,
		}
	}

	const isDocumenter = group?.data?.result?.member?.find(
		({ account, role }: { account: string; role: string }) =>
			account === user?.result?.account && role === roles.documenter,
	)

	if (isDocumenter) {
		return {
			isTechLead: false,
			isDeveloper: false,
			isDocumenter: true,
		}
	}

	return {
		isTechLead: false,
		isDeveloper: false,
		isDocumenter: false,
	}
}

export default useRole
