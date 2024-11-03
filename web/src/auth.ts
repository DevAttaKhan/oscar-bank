import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { copyPropertiesToTarget } from "@/lib/utils/auth.util";
import { AuthService } from "./services/auth.service";
import { IAuthSession, ILoginResponse } from "./interfaces/user.interface";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const res = await AuthService.loginUser(credentials);
          if (res.statusCode !== 200 || !res) return null;

          const data = res as ILoginResponse;

          const authSession: IAuthSession = {
            ...data.result.user,
            token: data?.result.token,
            refreshToken: data?.result.refreshToken,
          };
          return authSession;
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session, profile }) {
      if (trigger === "update") {
        copyPropertiesToTarget(token, session);
      }
      if (user) {
        copyPropertiesToTarget(token, user);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        copyPropertiesToTarget(session.user, token);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
