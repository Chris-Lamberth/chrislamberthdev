import { getPosts, getInstaPosts } from '$lib/server/sanity';

export async function load() {
	const loadPosts = async () => {
		try {
			const posts = await getPosts();
			return { posts };
		} catch (error) {
			console.error('Failed to fetch posts:', error);
			return { status: 500, error };
		}
	};

	const loadInstaFeed = async () => {
		try {
			const instaPosts = await getInstaPosts();
			return { instaPosts };
		} catch (error) {
			console.error('Failed to fetch Instagram feed:', error);
			return { status: 500, error };
		}
	};

	return {
		posts: await loadPosts(),
		instaPosts: await loadInstaFeed()
	};
}
