import { error } from '@sveltejs/kit';

import { getPost } from '#lib/server/sanity.ts';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (post) return post;

	error(404, 'work not found');
};
