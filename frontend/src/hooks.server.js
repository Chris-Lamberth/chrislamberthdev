// src/hooks.server.js

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const theme = event.cookies.get("theme");
 
	const response = await resolve(event, {
	  transformPageChunk: ({ html }) =>
		 html.replace('data-theme=""', `data-theme="${theme}"`),
	});
 
	return response;
 };
 
 /** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = ({ error }) => {
	// Log the error for debugging
	console.error('Error in handleError:', error);
 
	// Customize the error message based on the error code or type
	if (error.status === 404) {
	  return {
		 message: 'The page you are looking for does not exist.',
		 status: 404
	  };
	}
 
	return {
	  message: 'An unexpected error occurred. Please try again later.',
	  status: error.status || 500
	};
 };
 