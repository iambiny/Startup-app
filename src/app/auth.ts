import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log('User:', user);          // Thông tin người dùng
            // console.log('Account:', account);    // Thông tin tài khoản GitHub
            // console.log('Profile:', profile);    // Hồ sơ chi tiết từ GitHub
            const res = await fetch(`http://localhost:8000/api/user/checkHasAuthor/${profile?.id}`, {
                cache: "no-store"       // make it dynamic (no cache when in 'production')
            });
            const existingUser = await res.json();
            if (!existingUser) {
                await fetch(`http://localhost:8000/api/user/createAuthor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: profile?.id,
                        name: user.name,
                        username: profile?.login,
                        email: user.email,
                        image: user.image,
                        bio: profile?.bio || ''
                    })
                });
            }
            return true;    // continue the signIn process
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const res = await fetch(`http://localhost:8000/api/user/checkHasAuthor/${profile?.id}`, {
                    cache: "no-store"       // make it dynamic (no cache when in 'production')
                });
                const user = await res.json();
                token.id = user?._id;    // authorId (Lưu ý cần '?' vì ban đầu chạy sẽ báo lỗi nếu ko có) 
            }
            return token;
        },
        session({ session, token }) {
            Object.assign(session, { id: token.id });
            // console.log(session);
            return session;
        }
    }
})