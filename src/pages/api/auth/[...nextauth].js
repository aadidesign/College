// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await dbConnect();
                
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('No user found with this email');
                }
                
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error('Invalid password');
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});
