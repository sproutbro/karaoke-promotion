import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.auth) {
        locals.auth = new Date();
    } else {
        // ID값으로 채팅내용찾아오기
    }

    return {

    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    sendMsg: async (event) => {
        
    }
};
