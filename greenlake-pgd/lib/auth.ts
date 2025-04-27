/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { JWT } from 'next-auth/jwt';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Nombre de usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
          include: {
            settings: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        // No devolvemos la contraseña en el objeto usuario
        const { password, ...userWithoutPassword } = user;
        
        return userWithoutPassword as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        // Si el usuario tiene configuraciones, las añadimos al token
        if (user.settings) {
          token.preferredView = user.settings.preferredView;
          token.darkMode = user.settings.darkMode;
          token.language = user.settings.language;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.preferredView = token.preferredView;
        session.user.darkMode = token.darkMode;
        session.user.language = token.language;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
};
