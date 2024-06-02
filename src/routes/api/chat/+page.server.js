import { PrismaClient } from "@prisma/client";
import { json } from "@sveltejs/kit";
const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const content = data.get("content");
        const userId = "admin";

        try {
            const newMsg = await prisma.chat.create({
                data: {
                    userId,
                    content,
                }
            });

            return {
                status: 201,
                success: true,
                newMsg
            };
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
};
