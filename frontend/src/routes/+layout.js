import { getPosts, getInstaPosts } from "$lib/sanity";
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
 
inject({ mode: dev ? 'development' : 'production' });

export async function load() {

	const loadPosts = async () => {
		const posts = await getPosts();
		if (posts) {
			return { posts };
		} else {
			console.log("Failed to fetch posts"); 
			return { status: 500, error: new Error('Failed to fetch posts') };
		}
	}

	const loadInstaFeed = async () => {
		const instaPosts = await getInstaPosts();
		if (instaPosts) {
			return { instaPosts };
		} else {
			console.log("Failed to fetch Instagram feed");
			return { status: 500, error: new Error('Failed to fetch Instagram feed') };
		}
	}

	return {
		posts: await loadPosts(),
		instaPosts: await loadInstaFeed()
  };

}
	
injectSpeedInsights();

  