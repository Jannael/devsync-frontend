import type { ZodSchema, z } from 'zod'

function CreateValidator<S extends ZodSchema, T>(schema: S) {
	return (data: T): z.infer<S> => {
		try {
			const result = schema.parse(data ?? {})
			return result
		} catch (e) {
			throw new Error(JSON.parse((e as Error).message)[0].message)
		}
	}
}

export default CreateValidator
