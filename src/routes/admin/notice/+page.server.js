import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.auth();
    if (!session || session.user.email !== "krsproutbro@gmail.com")
        redirect(307, "/");

    try {
        const notice = await prisma.notice.findMany({ orderBy: { createdAt: 'desc' } });
        return { notice }
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get("id");
        const title = formData.get("noticeTitle");
        const content = formData.get("noticeContent");
        const createdAt = formData.get("createdAt");
        const { execute, data } = noticeData(id, title, content, createdAt);

        try {
            if (execute === "create") {
                await prisma.notice.create({
                    data
                })
                return { success: execute }
            }
            if (execute === "update") {
                await prisma.notice.update(data);
                return { success: execute }
            }
            if (execute === "delete") {
                await prisma.notice.delete(data)
                return { success: execute }
            }
        } catch (error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    }
};

function noticeData(id, title, content, createdAt) {
    let execute = "create";
    let data = {};

    if (id && !title) {
        execute = "delete";
        data = { where: { id: Number(id) } };
        return { execute, data };
    }

    if (id && title) {
        execute = "update"
        data = { where: { id: Number(id) }, data: { title, content } };
        if (createdAt) data.data.createdAt = new Date(createdAt).toISOString()
        return { execute, data };
    }

    data = { title, content };
    if (createdAt) data.createdAt = new Date(createdAt).toISOString();
    return { execute, data };
}