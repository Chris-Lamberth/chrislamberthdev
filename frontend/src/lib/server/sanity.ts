import { createClient } from '@sanity/client';
import { defineQuery } from 'groq';
import { config } from '#lib/sanity.js';
import { SANITY_TOKEN } from '$app/env/private';

const client = createClient({ ...config, token: SANITY_TOKEN, perspective: 'published' });

const featuredPostsQuery = defineQuery(`*[_type == "post" && defined(slug.current)]
	| order(publishedAt desc, _id asc)[0...6]{
		_id, title, mainImage, "categories": categories[]->{title}, slug
	}`);

const postsQuery = defineQuery(`*[_type == "post" && defined(slug.current)]
	| order(publishedAt desc, _id asc){
		_id, title, mainImage, "categories": categories[]->{title}, slug
	}`);

const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
	_id, title, mainImage, altHeaderImage, "categories": categories[]->{title},
	body, additionalImages, websiteLink, adSets,
	"previousSlug": *[
		_type == "post" && defined(slug.current) && (
			coalesce(publishedAt, "") > coalesce(^.publishedAt, "") ||
			(coalesce(publishedAt, "") == coalesce(^.publishedAt, "") && _id < ^._id)
		)
	] | order(publishedAt asc, _id desc)[0].slug.current,
	"nextSlug": *[
		_type == "post" && defined(slug.current) && (
			coalesce(publishedAt, "") < coalesce(^.publishedAt, "") ||
			(coalesce(publishedAt, "") == coalesce(^.publishedAt, "") && _id > ^._id)
		)
	] | order(publishedAt desc, _id asc)[0].slug.current
}`);

const instagramQuery = defineQuery(`*[
	_type == "instaFeed" && defined(postImage.asset) && defined(postURLs)
]{
	_id, name, postURLs, postImage
}`);

export async function getPosts(featured = false) {
	try {
		return featured ? await client.fetch(featuredPostsQuery) : await client.fetch(postsQuery);
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return null;
	}
}

export function getPost(slug: string) {
	return client.fetch(postQuery, { slug });
}

export async function getInstaPosts() {
	try {
		return await client.fetch(instagramQuery);
	} catch (error) {
		console.error('Failed to fetch Instagram feed:', error);
		return null;
	}
}
