// src/hooks.server.js

/** @type {import('@sveltejs/kit/hooks').Handle} */
export const handle = async ({ event, resolve }) => {
	const rawTheme = event.cookies.get('theme');
	const theme = rawTheme === 'light' || rawTheme === 'dark' ? rawTheme : '';

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});

	return response;
};

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
