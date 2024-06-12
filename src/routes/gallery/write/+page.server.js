import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


// 허용된 파일 확장자와 최대 파일 크기 설정
const allowedFileTypes = ['.jpeg', '.jpg', '.png', '.gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const data = Object.fromEntries(formData);

        // 파일 크기 확인
        if (data.image.size > maxFileSize) {
            return { message: "파일 크기가 너무 큽니다." }
        }

        // 파일 확장자 확인
        const extname = path.extname(data.image.name).toLowerCase();
        if (!allowedFileTypes.includes(extname)) {
            return { message: '허용되지 않는 파일 형식입니다.' };
        }

        const filePath = path.join(
            process.cwd(),
            'static',
            'uploads',
            `${crypto.randomUUID()}.${(data.image).type.split('/')[1]}`
        )

        const result = await fs.writeFile(filePath, Buffer.from(await (data.image).arrayBuffer()))
        console.log(result)
        return { message: '허용되지 않는 파일 형식입니다.' };
    }
};