import z from 'zod'
import passwordSchema from './pwdSchema'

const schema = z.object({
	account: z.string().email('introduce a valid email'),
	pwd: passwordSchema,
})

const validator = (obj: Record<string, string>) => {
	try {
		const result = schema.parse(obj)
		return result
	} catch (e: unknown) {
		if (e instanceof Error) return JSON.parse(e.message)[0].message
		return 'Invalid data'
	}
}

export default validator
