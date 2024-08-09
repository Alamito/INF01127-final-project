import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
    id: string;
    name: string;
    email: string;
    password: string,
    type: string,
    reservations: string,
    callbackUrl: string,
    csrfToken: string,
    json: string
}

const handler = NextAuth({
    pages: {
        signIn: "/log_in"
    },
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {
                const data = credentials as Credentials;
                
                return {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }
