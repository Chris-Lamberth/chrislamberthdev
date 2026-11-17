import { error } from '@sveltejs/kit';

import { getPost } from '#lib/server/sanity.js';

export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (post) return post;

	error(404, 'work not found');
};
