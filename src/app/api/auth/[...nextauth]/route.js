import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {

          if (!credentials.otp) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
              email: credentials.email,
              password: credentials.password,
            });

            if (res.data.success) {
              throw new Error("OTP_SENT"); 
            }
          }

          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-login-otp`, {
            email: credentials.email,
            otp: credentials.otp,
          });

          if (res.data.success && res.data.token) {
            return {
              ...res.data.user,
              accessToken: res.data.token,
            };
          }

          return null;
        } catch (error) {
          throw new Error(error.response?.data?.message || error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };