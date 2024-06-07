import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.auth();
    if (session) {
        if (session.user.email == "krsproutbro@gmail.com") {
            return {
                session
            }
        }
    }
    redirect(307, "/")
}