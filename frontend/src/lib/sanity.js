import { createClient } from '@sanity/client'; 
import createImageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_TOKEN} from '$env/static/public';

export const config = {  
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',  
	apiVersion: 'v2023-06-06',  
	token: PUBLIC_SANITY_TOKEN,
	useCdn: true,  
	ignoreBrowserTokenWarning: true  
};  

export const client = createClient(config); 
export const imgUrl = (/** @type {any} */ source) => createImageUrlBuilder(config).image(source);

// All Posts (Work)
export async function getPosts() {
	return await client.fetch(`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
		_id,
		title,
		mainImage,
		"categories": categories[]->{
		  title
		},
		slug
	 }`);
}

//Single Page (Work)
export async function getPost(slug) {
	return await client.fetch(`*[_type == "post" && slug.current == $slug][0]`,
	  {
		 slug,
	  }
	);
 }

 // Instagram Feed
 export async function getInstaPosts() {
	return await client.fetch(`*[_type == "instaFeed"]{
		_id,
		name,
		postURLs,
		"imageUrl": postImage.asset->url
	}`);
}