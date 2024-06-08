/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    let admin = false
    if (event.url.pathname.substring(0, 6) === "/admin") {
        admin = true;
    }
    const session = await event.locals.auth()
    return {
        session, admin
    }
}