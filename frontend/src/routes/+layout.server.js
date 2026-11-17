import { getPosts, getInstaPosts } from '#lib/server/sanity.js';

export async function load() {
	const [posts, instaPosts] = await Promise.allSettled([getPosts(), getInstaPosts()]);

	if (posts.status === 'rejected') console.error('Failed to fetch posts:', posts.reason);
	if (instaPosts.status === 'rejected') {
		console.error('Failed to fetch Instagram feed:', instaPosts.reason);
	}

	return {
		posts: posts.status === 'fulfilled' ? posts.value : null,
		instaPosts: instaPosts.status === 'fulfilled' ? instaPosts.value : null
	};
}
