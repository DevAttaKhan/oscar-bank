import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { copyPropertiesToTarget } from "@/lib/utils/auth.util";
import { AuthService } from "./services/auth.service";
import {
  IAuthSession,
  ILoginResponse,
  IRefreshToken,
} from "./interfaces/user.interface";
import { isExpired } from "react-jwt";
import { IApiError } from "./interfaces/types";
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
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
          console.log(error.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        copyPropertiesToTarget(token, session);
      }
      if (user) {
        copyPropertiesToTarget(token, user);
      }

      const isTokenExpired = isExpired(token.token);

      if (isTokenExpired) {
        const res = await AuthService.refreshToken(token.refreshToken);
        if ((res as IApiError).statusCode !== 403)
          copyPropertiesToTarget(token, {
            token: (res as IRefreshToken).result.token,
            refreshToken: (res as IRefreshToken).result.token,
          });
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
