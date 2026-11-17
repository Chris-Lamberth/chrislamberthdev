import { getPosts } from '#lib/server/sanity.ts';

export async function load() {
	return { posts: await getPosts() };
}
