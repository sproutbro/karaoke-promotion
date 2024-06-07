import { PrismaClient } from '@prisma/client';
import { io } from "socket.io-client";
const prisma = new PrismaClient();
import { IS_LOCAL } from '$env/static/private';

let socket;

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
    const session = await event.locals.auth();
    let data = [];
    if (session) {
        // 접속 경로 확인
        const referer = event.request.headers.get("referer")
        const parts = referer.split('/');
        const path = parts.pop();

        // 로컬 분기처리
        if (IS_LOCAL) {
            socket = io("http://localhost:3000", { cors: { origin: "*" } });
        } else {
            socket = io();
        }

        if (path === "admin") {
            // 접속경로가 ADMIN일경우 모든 데이터 SOCKET ADMIN 등록
            data = await prisma.chat.findMany();
        } else {
            // email값으로 채팅기록 가져오기 SOCKET EMAIL 등록
            data = await prisma.chat.findMany({ where: { userId: session.user.email } });
        }

        return new Response(
            JSON.stringify({ data, IS_LOCAL })
        )
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
        const message = data.get("content");

        let userId = session.user.email;
        let toUserId = data.get("toUserId");
        let admin = false;

        if (!toUserId) {
            // 보내는 사람 admin이면 유저아이디 user의 경우 admin
            toUserId = "admin"
        } else {
            // 어드민일경우 db 어드민 컬럼 true
            admin = true;
            // 어드민의 경우 보내는 유저 상대방으로 함 db 조회용
            userId = toUserId;
        }

        // 메세지 전송
        socket.emit("send message", { toUserId, message });

        // DB 저장
        const newChat = await prisma.chat.create({
            data: {
                userId,
                content: message,
                admin: Boolean(admin)
            }
        })

        return new Response(JSON.stringify(newChat), {
            status: 201
        });
    } else {
        return new Response(
            // 나중에 제대로 권한없음이든 잘못된접근이든 빼자
            JSON.stringify({ message: "잘못된접근입니다." })
        )
    }
}