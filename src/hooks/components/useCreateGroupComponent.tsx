import { useState } from 'react'
import { routesConst } from '../../routes.constants'
import ValidateFromSchema from '../../service/FormValidations/ValidateFromSchema'
import GroupValidator from '../../service/GroupValidation'
import useCreateGroup from '../group/useCreateGroup'

function useCreateGroupComponent() {
	const [error, setError] = useState<string | null>(null)
	const [members, setMembers] = useState<
		Array<{ account: string; role: string }>
	>([])
	const [techLeads, setTechLeads] = useState<string[]>([])

	const { createGroup } = useCreateGroup(() => {
		window.location.href = routesConst.main
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// adding the members and techLeads to formData so it can be validated
		const formData = new FormData(e.currentTarget)
		formData.append('member', JSON.stringify(members))
		formData.append('techLead', JSON.stringify(techLeads))

		const isValid = ValidateFromSchema({
			formEvent: e,
			setError,
			validator: GroupValidator,
		})
		if (!isValid) return
		const { name, repository, color } = isValid

		createGroup.mutate({
			name,
			repository,
			color,
			member: members,
			techLead: techLeads,
		})
	}

	return {
		error,
		setError,
		handleSubmit,
		setTechLeads,
		setMembers,
		members,
		techLeads,
		createGroup,
	}
}

export default useCreateGroupComponent
