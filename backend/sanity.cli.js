import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ps0x3kbb',
    dataset: 'production',
  },
  typegen: {
    path: '../frontend/src/lib/server/sanity.ts',
    schema: './.sanity/schema.json',
    generates: '../frontend/src/lib/sanity.types.ts',
    formatGeneratedCode: false,
  },
})
