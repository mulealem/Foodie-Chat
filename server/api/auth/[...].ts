import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
// import DescopeProvider from 'next-auth/providers/descope'

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const runtimeConfig = useRuntimeConfig();

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  secret: "my-superb-secret",

  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: "1bcc26d57ad33bb67392",
      clientSecret: "00d8e8930f308d1539e2198f429814caa2230780",
    }),
    // DescopeProvider({
    //     clientId: "P2TbTmeRWRUUY1Esqfx4qifcON6f",
    //     clientSecret: "K2TcP5m8I6qgi6WEINUhiqg3YX3taExjKrGBbMsy9DIoaIogiKAubPoqDR3WXmIDfx2ZtbA",
    //   }),
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2TbTmeRWRUUY1Esqfx4qifcON6f/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: runtimeConfig.public.DESCOPE_PROJECT_ID,
      clientSecret: runtimeConfig.DESCOPE_ACCESS_KEY,
      token: `https://api.descope.com/${runtimeConfig.public.DESCOPE_PROJECT_ID}/token`,
      checks: ["pkce", "state"],
      userinfo: {
        url: `https://api.descope.com/${runtimeConfig.public.DESCOPE_PROJECT_ID}/userinfo`,
        async request({ client, tokens }) {
          const profile = await client.userinfo(tokens.access_token);

          const bearerToken =
            runtimeConfig.public.DESCOPE_PROJECT_ID +
            ":" +
            runtimeConfig.DESCOPE_MANAGEMENT_KEY;

          const response = await fetch(
            "https://api.descope.com/v1/mgmt/user?userId=" + profile.sub,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const data = await response.json();

          // console.log("runtimeConfig:::: ::::: ::::::", runtimeConfig);

          //         isCompany          Boolean            @default(false)
          // companyName        String?
          // companyDescription String?
          // companySlogan      String?
          // companyLogoUrl     String?

          profile.isCompany = data.user.customAttributes.isCompany;
          profile.companyName = data.user.customAttributes.companyName;
          profile.companyDescription =
            data.user.customAttributes.companyDescription;
          profile.companySlogan = data.user.customAttributes.companySlogan;
          profile.companyLogoUrl = data.user.customAttributes.companyLogoUrl;

          // console.log("user ::> ", data.user);

          return profile;
        },
      },
      profile(profile) {
        // console.log("profile:: ", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isCompany: profile.isCompany,
          companyName: profile.companyName,
          companyDescription: profile.companyDescription,
          companySlogan: profile.companySlogan,
          companyLogoUrl: profile.companyLogoUrl,
        };
      },
    },
  ],
  callbacks: {
    session: async ({ session }) => {
      // console.log("session :: >> :: ", session.user);
      const email: string = session.user?.email ?? "";
      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      var newSession = {
        ...session,
      };

      if (userExists) {
        newSession = userExists;
      }

      // console.log("newSession _______________:: >> :: ", newSession);

      return newSession;
    },
  },
});
