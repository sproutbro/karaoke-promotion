import { isFirstEventInAnHour } from "$lib/utils.js";
import { IS_LOCAL } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const session = await event.locals.auth();
    let data = [];
    if (session) {
        try {
            if (session.user.email === "krsproutbro@gmail.com") {
                // 접속경로가 ADMIN일경우 모든 데이터 SOCKET ADMIN 등록
                data = await prisma.chat.findMany();
            } else {
                // email값으로 채팅기록 가져오기 SOCKET EMAIL 등록
                data = await prisma.chat.findMany({ where: { userId: session.user.email } });
            }
            return new Response(
                JSON.stringify({ data, IS_LOCAL })
            )
        } catch (error) {
            console.error(error)
        } finally {
            await prisma.$disconnect();
        }
    } else {
        // 나중에 제대로 권한없음이든 잘못된접근이든 빼자
        return new Response(
            JSON.stringify({ message: "잘못된접근입니다." })
        )
    }
}

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
    const session = await event.locals.auth();
    if (session) {
        const data = await event.request.formData();
        const message = data.get("message");
        const toUserId = data.get("toUserId");

        // 받는사람이 어드민일경우 작성자는 어드민 아님
        let admin = toUserId == "admin" ? false : true;

        // 받는 사람 어드민의 경우 작성자는 유저로 db 조회용
        let userId = toUserId == "admin" ? session.user.email : toUserId;

        try {
            // DB 저장
            const newChat = await prisma.chat.create({
                data: {
                    userId,
                    content: message,
                    admin
                }
            })

            // 한시간동안 없던 유저인경우
            if (!newChat.admin) {
                isFirstEventInAnHour(newChat);
            }

            return new Response(JSON.stringify(newChat), {
                status: 201
            });
        } catch (error) {
            console.error(error)
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return new Response(
            // 나중에 제대로 권한없음이든 잘못된접근이든 빼자
            JSON.stringify({ message: "잘못된접근입니다." })
        )
    }
}