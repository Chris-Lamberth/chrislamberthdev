/** @type {import('@sveltejs/kit/hooks').HandleServerError} */
export const handleError = ({ error, kind }) => {
	if (kind !== 'unknown') {
		return error.status === 404
			? { message: 'The page you are looking for does not exist.' }
			: undefined;
	}

	console.error('Request failed:', error);
	return {
		message: 'An unexpected error occurred. Please try again later.'
	};
};
