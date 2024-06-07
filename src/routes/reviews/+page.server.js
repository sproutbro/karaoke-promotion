import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({url}) {
    // 쿼리 매개변수에서 페이지 번호와 검색어를 가져옵니다.
    const currentPage = parseInt(url.searchParams.get('page')) || 1;
    const search = url.searchParams.get('search') || '';
    const pageSize = 10;
    const offset = (currentPage - 1) * pageSize;

    try {
        // 검색 조건에 맞는 게시물 목록을 가져옵니다.
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
            skip: offset,
            take: pageSize,
            orderBy: { createdAt: 'desc' }
        });
    
        // 검색 조건에 맞는 전체 게시물 수를 가져옵니다.
        const totalPosts = await prisma.post.count({
            where: {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            }
        });

        //날자 변환
        posts.forEach(post => {
            post.createdAt = post.createdAt.toLocaleDateString();
        });
    
        return {
            posts,
            currentPage,
            pageSize,
            totalPosts,
            search
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { status: 500, error: 'Internal server error' };
    } finally {
        await prisma.$disconnect();
    }
}