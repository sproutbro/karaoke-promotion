import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";
const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export async function GET(event) {
    try {
        const chatMsg = await prisma.chat.findMany({
            where: {
                userId: 'admin',
            }
        })
        return json({
            chatMsg
        });
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}