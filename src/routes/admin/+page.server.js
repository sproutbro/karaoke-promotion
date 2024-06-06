import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.auth();
    if (session) {
        if (session.user.email == "krsproutbro@gmail.com") {

            const chat = await prisma.chat.findMany()

            return {
                session, chat
            }
        }
    }
    redirect(307,"/")
}