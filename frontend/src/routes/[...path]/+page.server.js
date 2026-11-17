import { error } from '@sveltejs/kit';

export const load = () => {
	error(404, 'page not found');
};
