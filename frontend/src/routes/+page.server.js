import { getPosts, getInstaPosts } from '#lib/server/sanity.ts';

export async function load() {
	const instaPosts = getInstaPosts();
	return { posts: await getPosts(true), instaPosts };
}
