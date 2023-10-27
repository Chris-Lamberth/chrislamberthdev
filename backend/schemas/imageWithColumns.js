export default {
	name: 'imageWithColumns',
	title: 'Image with Columns',
	type: 'object',
	fields: [
	  {
		 name: 'image',
		 title: 'Image',
		 type: 'image',
		 options: {
			hotspot: true,
		 },
	  },
	  {
		 name: 'alt',
		 title: 'Alternative Text',
		 type: 'string',
	  },
	  {
		 name: 'columns',
		 title: 'Columns',
		 type: 'number',
		 validation: Rule => Rule.min(1).max(12), // Adjust max based on your grid system
	  },
	],
	preview: {
	  select: {
		 imageUrl: 'image',
		 alt: 'alt',
		 columns: 'columns',
	  },
	  prepare({ imageUrl, alt, columns }) {
		 return {
			title: alt || 'Image',
			subtitle: `Columns: ${columns}`,
			media: imageUrl,
		 };
	  },
	},
 }
 