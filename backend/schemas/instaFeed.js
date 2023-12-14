import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'instaFeed',
  title: 'Instagram Feed',
  type: 'document',
  fields: [
	defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'postURLs',
      title: 'Post URL',
      type: 'url',
    }),
	 defineField({
		name: 'postImage',
		title: 'Image',
		type: 'image',
		options: {
		  hotspot: true,
		},
	 }),
  ],
  preview: {
    select: {
      media: 'postImage',
    },
  },
});
