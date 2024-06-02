import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

// 일반로그인
import Credentials from "@auth/sveltekit/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "./lib/zod"

// Oauth 로그인
import Google from "@auth/sveltekit/providers/google"
import Kakao from "@auth/sveltekit/providers/kakao"

const prisma = new PrismaClient()


let emailLogin = new Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
        email: {},
        password: {},
    },
    authorize: async (credentials) => {
        let user = null

        // prisma.

        return user;
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        // if (!user) {
        //     throw new Error("User not found.")
        // }

        // // return json object with the user data
        // return user
    },
})

export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        emailLogin,
        Google,
        Kakao
    ],
})

