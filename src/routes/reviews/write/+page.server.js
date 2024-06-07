import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    // const auth = await event.locals.auth();
    // if(!auth) {
    //     throw redirect(303, '/auth/signin');
    // }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, locals}) => {

        // const auth = await locals.auth();
        // const name = auth.user.name;
        // const email = auth.user.email;
        const data = await request.formData();
        const title = data.get('title');
        const content = data.get('content');
        
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
            }
        });
        
        return {
            status: 201,
            success: true
        };
    }
};