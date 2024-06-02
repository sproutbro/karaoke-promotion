import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// 비밀번호를 해싱하는 함수
async function hashPassword(password) {
    const saltRounds = 10; // 솔트 라운드 수
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// 비밀번호를 검증하는 함수
async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

// 로그인 검증 함수
async function getUserFromDb(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    })

    // 유저 검증
    if (!user) {
        return { verified: false, message: 'User not found' };
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return { verified: false, message: 'Invalid password' };
    }

    return { verified: true, user: user };
}

export { hashPassword, verifyPassword, getUserFromDb };