export * from './authSchema'

export * from './userSchema'

export * from './skillSchema'

export const validateOptions = {
	abortEarly: false,
	errors: {
		escapeHtml: true,
		wrap: {
			label: ''
		}
	}
}