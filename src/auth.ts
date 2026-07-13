import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_GITHUB_EMAIL;
      if (!adminEmail) return false; // Fail safe
      
      // Only allow the specific admin email
      if (user.email === adminEmail) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/error",
  }
})
