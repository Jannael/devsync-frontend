import { useRef } from 'react'
import AccountValidation from '../../service/AccountValidation'
import Button from '../ui/Button'
import InputText from '../ui/InputText'
import Label from '../ui/Label'
import Wrapper, { WrapperItem } from '../Wrapper'
import { TechLeadItem } from './TechLeadWrapperItem'

function TechLeadInput({
	setError,
	techLeads,
	setTechLeads,
}: {
	setError: React.Dispatch<React.SetStateAction<string | null>>
	techLeads: string[]
	setTechLeads: React.Dispatch<React.SetStateAction<string[]>>
}) {
	const techLeadInput = useRef<HTMLInputElement | null>(null)

	const handleAddTechLead = () => {
		const account = techLeadInput.current!.value
		const isValid = AccountValidation({ account })
		if (typeof isValid === 'string') {
			setError(isValid)
			return
		}
		if (techLeads.includes(account)) {
			setError('account in techLead list')
			return
		}

		setTechLeads([...techLeads, account])
	}

	const techLeadList = techLeads.map((techLead) => {
		return (
			<WrapperItem key={techLead}>
				<TechLeadItem
					account={techLead}
					onDelete={() => {
						const newTechLeads = techLeads.filter(
							(current) => current !== techLead,
						)
						setTechLeads(newTechLeads)
					}}
				/>
			</WrapperItem>
		)
	})

	return (
		<div className='w-full'>
			<div
				className='
							flex
							w-full
							mb-4
							justify-between items-end gap-3
						'
			>
				<Label>
					TechLead account
					<InputText placeholder='example@gmail.com' ref={techLeadInput} />
				</Label>
				<Button className='' onClick={handleAddTechLead}>
					Add
				</Button>
			</div>
			<Wrapper title='TechLeads'>{techLeadList}</Wrapper>
		</div>
	)
}
export default TechLeadInput
