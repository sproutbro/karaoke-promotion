import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const session = await event.locals.auth();
    if (session) {
        const data = await prisma.chat.findMany({ where: { userId: session.user.email } });
        return new Response(
            JSON.stringify(data)
        )
    } else {
        return new Response(
            JSON.stringify({ message: "잘못된접근입니다." })
        )
    }
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
    const session = await event.locals.auth();
    if (session) {

        const email = session.user.email;
        const data = await event.request.formData();
        const content = data.get("content");

        const newChatMessage = await prisma.chat.create({
            data: {
                userId: email,
                content
            }
        })

        console.log(newChatMessage);

        return new Response(
            JSON.stringify(await prisma.chat.findMany({ where: { userId: session.user.email } }))
        )
    } else {
        return new Response(
            JSON.stringify({ message: "잘못된접근입니다." })
        )
    }
}