import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authService } from './services/authService';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || 'culinary_blog_nhom14_secret_key_lab4_2026',
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      name: 'Culinary Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email) {
          return null;
        }

        try {
          const authResult = await authService.login(
            String(credentials.email),
            credentials.password ? String(credentials.password) : undefined
          );

          if (authResult?.user) {
            return {
              id: authResult.user.id,
              name: authResult.user.displayName || authResult.user.email,
              email: authResult.user.email,
              image: authResult.user.avatarUrl || null,
              roles: authResult.user.roles || ['User'],
              bio: authResult.user.bio || null,
              accessToken: authResult.accessToken,
              refreshToken: authResult.refreshToken,
            };
          }
        } catch (error) {
          console.error('Lỗi xác thực Auth.js:', error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as any).roles;
        token.bio = (user as any).bio;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
      }
      if (trigger === 'update' && session) {
        token.name = session.user?.name ?? token.name;
        token.picture = session.user?.image ?? token.picture;
        token.bio = (session.user as any)?.bio ?? token.bio;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || session.user.id;
        (session.user as any).roles = token.roles || ['User'];
        (session.user as any).bio = token.bio || null;
        (session.user as any).accessToken = token.accessToken || null;
      }
      return session;
    },
  },
});
