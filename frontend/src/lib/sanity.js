import { createImageUrlBuilder } from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID } from '$app/env/public';

export const config = {
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: 'v2023-06-06',
	useCdn: true
};

export const imgUrl = (/** @type {any} */ source) => createImageUrlBuilder(config).image(source);
