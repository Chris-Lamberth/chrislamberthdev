import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SANITY_PROJECT_ID: {
		public: true,
		static: true
	},
	SANITY_TOKEN: {
		schema: (value) => value || undefined
	}
});
