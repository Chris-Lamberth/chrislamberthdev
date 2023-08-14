import { getPosts } from "$lib/sanity";

export async function load() {
  const posts = await getPosts();
  console.log('from page.js', posts);

  if (posts) {
    console.log("Successfully fetched posts", posts);
    return { posts };
  } else {
    console.log("Failed to fetch posts"); 
    return { status: 500, error: new Error('Failed to fetch posts') };
  }
}