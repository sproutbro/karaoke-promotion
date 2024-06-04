import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth"

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const session = await event.locals.auth()
    if (session) {
        redirect(307, "/")
    }
}

/** @type {import('./$types').Actions} */
export const actions = { default: signIn };