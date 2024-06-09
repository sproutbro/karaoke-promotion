import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const { id } = params;
    try {
        const notice = await prisma.notice.findUnique({
            where: {
                id: Number(id)
            }
        })
        notice.createdAt = notice.createdAt.toLocaleDateString();

        const noticeComments = await prisma.noticeComment.findMany({
            where: {
                noticeId: Number(id)
            },
            orderBy: { createdAt: 'desc' }
        })

        noticeComments.forEach(noticeComment => {
            noticeComment.createdAt = noticeComment.createdAt.toLocaleDateString();
        });

        return {
            notice, noticeComments
        }
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const session = await event.locals.auth();
        if (!session) return;

        const formData = await event.request.formData()
        const content = formData.get("content");
        const noticeId = formData.get("noticeId");
        const anonymous = formData.get("anonymous");
        const id = formData.get("id");
        const email = session.user.email;
        let name = session.user.name;
        if (anonymous) name = "비공개";
        console.log(content, noticeId, email, anonymous, name, id);

        try {
            if (id) {
                await prisma.noticeComment.delete({
                    where: {
                        id: Number(id)
                    }
                })
            } else {
                await prisma.noticeComment.create({
                    data: {
                        content,
                        noticeId: Number(noticeId),
                        email,
                        name
                    }
                })
            }
            return { success: true }
        } catch (error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}