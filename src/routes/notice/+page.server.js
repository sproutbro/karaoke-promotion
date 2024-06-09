import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load(event) {
    try {
        const notices = await prisma.notice.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { NoticeComment: true }
                }
            }
        });
        //날자 변환
        notices.forEach(notice => {
            notice.createdAt = notice.createdAt.toLocaleDateString();
        });
        return { notices }
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}