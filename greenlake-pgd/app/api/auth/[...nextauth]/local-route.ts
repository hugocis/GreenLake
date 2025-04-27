import { localAuthOptions } from '@/lib/localAuth';
import NextAuth from 'next-auth';

const handler = NextAuth(localAuthOptions);

export { handler as GET, handler as POST };
