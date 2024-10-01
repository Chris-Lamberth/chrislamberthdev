	import {defineField, defineType} from 'sanity'

	const sizeFields = [
		{ name: 'size728x90', title: '728x90', type: 'boolean' },
		{ name: 'size300x600', title: '300x600', type: 'boolean' },
		{ name: 'size160x600', title: '160x600', type: 'boolean' },
		{ name: 'size300x250', title: '300x250', type: 'boolean' },
		{ name: 'size300x50', title: '300x50', type: 'boolean' },
		// ... add more sizes as needed
	 ].map(size => defineField({
		...size,
		options: { layout: 'checkbox' },
	 }));

	export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
		name: 'title',
		title: 'Title',
		type: 'string',
		}),
		defineField({
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		options: {
			source: 'title',
			maxLength: 96,
		},
		}),
		defineField({
		name: 'categories',
		title: 'Categories',
		type: 'array',
		of: [{type: 'reference', to: {type: 'category'}}],
		}),
		defineField({
		name: 'publishedAt',
		title: 'Published at',
		type: 'datetime',
		}),
		defineField({
		name: 'mainImage',
		title: 'Main image',
		type: 'image',
		options: {
			hotspot: true,
		},
		}),
		defineField({
			name: 'altHeaderImage',
			title: 'Alternative Header image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
		name: 'additionalImages',
		title: 'Additional Images',
		type: 'array',
		of: [
			{
				type: 'imageWithColumns',
			},
			],
		}),
		
		defineField({
		name: 'body',
		title: 'Body',
		type: 'blockContent',
		}),
		defineField({
			name: 'adSets',
			title: 'Ad Sets',
			type: 'array',
			of: [
			  defineType({
				 name: 'adSet',
				 title: 'Ad Set',
				 type: 'object',
				 fields: [
					defineField({
					  name: 'name',
					  title: 'Ad Set Name',
					  type: 'string',
					  description: 'Enter the name of the ad set folder (e.g., "ad-set-1").',
					}),
					...sizeFields, // Spread size fields here
				 ],
			  }),
			],
			description: 'Configure the ad sets for this post.',
		 }),
		
		defineField({
			name: 'websiteLink',
			title: 'Website Link',
			type: 'url',
			validation: Rule => Rule.uri({
				scheme: ['http', 'https', 'mailto', 'tel'],
				allowRelative: false,
			}).optional(),
		}),
		
		
	],

	preview: {
	select: {
		title: 'title',
		media: 'mainImage',
	},
	prepare(selection) {
		return {...selection}
	},
	},
	})
