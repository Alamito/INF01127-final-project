import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/log_in"
    },
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {

                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                }
                const res = await fetch('http://localhost:8080/api/login', config);
                
                if (res.status === 200) {
                    const data = await res.json();
                    return {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                    }
                }
                return null;
            }
        })
    ]
})

export { handler as GET, handler as POST }
