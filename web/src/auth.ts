import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { copyPropertiesToTarget } from "@/lib/utils/auth.util";
import { AuthService } from "./services/auth.service";
import {
  IAuthSession,
  ILoginResponse,
  UserType,
} from "./interfaces/user.interface";

const redirectPaths = {
  [UserType.ADMIN]: "/admin",
  [UserType.EMPLOYEE]: "/internal",
  [UserType.CUSTOMER]: "/dashboard",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        const res = await AuthService.loginUser(credentials);
        console.log("auth", res);
        if (res.statusCode !== 200 || !res) return null;
        console.log("auth ==============>");

        const data = res as ILoginResponse;

        const authSession: IAuthSession = {
          ...data.result.user,
          token: data?.result.token,
          refreshToken: data?.result.refreshToken,
        };
        return authSession;
      },
    }) || null,
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
    async signIn({ user }) {
      console.log({ user });
      return redirectPaths[user.userType];
    },
  },

  pages: {
    signIn: "/login",
  },
});
