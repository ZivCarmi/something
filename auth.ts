import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_KEY as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};
