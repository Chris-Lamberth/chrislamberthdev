import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'bannerAdSet',
  title: 'Banner Ad Set',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Set Name',
      type: 'string',
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [ // You can predefine sizes here
          { title: '728x90', value: '728x90' },
          { title: '300x600', value: '300x600' },
          { title: '160x600', value: '160x600' },
          { title: '300x250', value: '300x250' },
          { title: '300x50', value: '300x50' },
          // add more sizes as needed
        ],
        layout: 'tags' // This will allow you to select multiple options as tags
      },
    }),
    defineField({
      name: 'filePath',
      title: 'File Path',
      type: 'string',
      description: 'Path to the static files, relative to the static/banner-ads/ directory',
    }),
  ],
});
