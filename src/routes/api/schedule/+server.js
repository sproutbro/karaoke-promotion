import schedule from "node-schedule";
import prisma from '$lib/prisma.js';

// 매 시간 0분에 작업 실행
const job = schedule.scheduleJob('0 * * * *', function () {
    delChat();
});

// 채팅db 지우는함수
async function delChat() {
    const now = new Date();

    try {
        const user = await prisma.chat.findMany();

        user.forEach(async (element) => {
            if ((now - element.createdAt) > 3600000) {
                await prisma.chat.delete({
                    where: {
                        id: element.id
                    }
                })
            };
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect(); // Prisma Client와의 연결을 종료합니다.
    }
}