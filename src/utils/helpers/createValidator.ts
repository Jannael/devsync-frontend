import type z from 'zod'

function createValidator(schema: z.ZodObject<z.ZodRawShape>) {
	return (obj: Record<string, string>) => {
		try {
			const result = schema.parse(obj)
			return result
		} catch (e: unknown) {
			if (e instanceof Error) return JSON.parse(e.message)[0].message
			return 'Invalid data'
		}
	}
}

export default createValidator
