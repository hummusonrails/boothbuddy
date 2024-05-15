export default defineNuxtConfig({
  app: {
    head: {
      title: 'BoothBuddy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
    },
  },

  css: [],

  plugins: [
    '~/plugins/appwrite.client.js',
  ],

  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
      appWriteBoothDatabaseId: process.env.APPWRITE_BOOTH_DATABASE_ID,
      appwriteBoothCollectionId: process.env.APPWRITE_BOOTH_COLLECTION_ID,
      appWriteBoothBucketId: process.env.APPWRITE_BOOTH_BUCKET_ID,
      appWriteAiFunctionId: process.env.APPWRITE_AI_FUNCTION_ID,
      openaiApiKey: process.env.OPENAI_API_KEY,
      analysisQuestion: process.env.VUE_APP_ANALYSIS_QUESTION,
    },
  },

  modules: [
    'nuxt-chatgpt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  chatgpt: {
    apiKey: process.env.OPENAI_API_KEY,
  },

  vite: {},
})
