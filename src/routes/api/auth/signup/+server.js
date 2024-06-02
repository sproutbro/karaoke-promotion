import { error } from '@sveltejs/kit';
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "$lib/zod.js";
import { ZodError } from "zod";
import { hashPassword } from "$lib/utils.js"

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.formData();
    const email = body.get("email");
    const password = body.get("password");

    try {
        // 유효성 검사
        const data = await signInSchema.parse({ email, password });

        // Password hash
        data.password = await hashPassword(password);

        // db 연결
        const prisma = new PrismaClient();

        // 중복 검사
        const existingUser = await prisma.users.findUnique({
            where: { email: email }
        });
        if (existingUser) {
            return new Response(JSON.stringify({
                message: '사용자가 이미 존재합니다!',
            }), { status: 422 });
        }

        // 신규유저 생성
        const newUser = await prisma.users.create({
            data: {
                email: data.email,
                password: data.password
            }
        });

        console.log('User created successfully');

        return new Response(JSON.stringify({
            message: 'User created successfully',
            newUser,
        }), { status: 201 });
    } catch (err) {
        if (err instanceof ZodError) {
            console.error(err.format())
            error(400,
                err.format()
            )
        } else {
            console.error(err)
        }
    }
}