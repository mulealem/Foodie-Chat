// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxthq/ui",
    "@nuxtjs/google-fonts",
    "dayjs-nuxt",
    "@pinia/nuxt",
    "nuxt-socket-io",
  ],
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: "http://localhost:3000",
      },
    ],
  },
  // ui: {
  //   icons: "all",
  // },
  auth: {
    globalAppMiddleware: true,
    // origin: "http://localhost:3000/",
  },
  runtimeConfig: {
    // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // DESCOPE_PROJECT_ID: process.env.DESCOPE_PROJECT_ID,
    DESCOPE_ACCESS_KEY: process.env.DESCOPE_ACCESS_KEY,
    DESCOPE_MANAGEMENT_KEY: process.env.DESCOPE_MANAGEMENT_KEY,
    public: {
      DESCOPE_PROJECT_ID: process.env.DESCOPE_PROJECT_ID,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  },
  colorMode: {
    preference: "dark",
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
});
