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
        console.log(data)
        const filePath = path.join(
            process.cwd(),
            'static',
            'uploads',
            `${crypto.randomUUID()}.${(data.image).type.split('/')[1]}`
        )
        await fs.writeFile(filePath, Buffer.from(await (data.image).arrayBuffer()))
        console.log(filePath)
    }
};