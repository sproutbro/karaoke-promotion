import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const {id} = params;
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    const comments = await prisma.comment.findMany({
        where: {postId: parseInt(id)},
        orderBy: { createdAt: 'desc' }
    })

    console.log(comments)

    return {
        post, comments
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, locals, params}) => {
        const {id} = params;

        const postId = parseInt(id);

        const name = "sddsfdsf";
        const email = "sdfdsf";
        const data = await request.formData();
        const content = data.get("comment")

        const newComment = await prisma.comment.create({
            data: {
                content,
                email,
                name,
                postId,
            }
        })
    }
};