import { createClient } from '@sanity/client';
import { config } from '#lib/sanity.js';
import { SANITY_TOKEN } from '$app/env/private';

const client = createClient({ ...config, token: SANITY_TOKEN, perspective: 'published' });

// All Posts (Work)
export async function getPosts() {
	return await client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
		_id,
		title,
		mainImage,
		"categories": categories[]->{
		  title
		},
		slug,
		publishedAt
	 }`);
}

// Single Page (Work)
export async function getPost(slug) {
	return await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]{
	  _id,
	  title,
	  mainImage,
	  altHeaderImage,
	  "categories": categories[]->{
		 title
	  },
	  slug,
	  body[]{
		 _key,
		 ...,
		 markDefs[]{
			_key,
			...
		 }
	  },
	  "additionalImages": additionalImages[]{
		 image{ ..., hotspot },
		 alt,
		 columns
	  },
	  "websiteLink": websiteLink,
	  "adSets": adSets[]{
		_key,
		name,
		size728x90,
		size300x600,
		size160x600,
		size300x250,
		size300x50,
	 }
	}`,
		{ slug }
	);
}

// Instagram Feed
export async function getInstaPosts() {
	return await client.fetch(`*[_type == "instaFeed" && defined(postImage.asset) && defined(postURLs)]{
		_id,
		name,
		postURLs,
		"imageUrl": postImage.asset->url
	}`);
}
