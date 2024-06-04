import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

// Oauth 로그인
import Google from "@auth/sveltekit/providers/google"
import Kakao from "@auth/sveltekit/providers/kakao"

const prisma = new PrismaClient()

export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Kakao
    ],
})

