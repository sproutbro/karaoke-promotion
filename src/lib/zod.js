import { object, string } from "zod"

export const signInSchema = object({
    email: string({ required_error: "이메일은 필수입니다" })
        .min(1, "이메일은 필수입니다")
        .email("이메일 형식이 올바르지 않습니다"),
    password: string({ required_error: "비밀번호가 필요합니다" })
        .min(1, "비밀번호가 필요합니다")
        .min(8, "비밀번호는 8자 이상이어야 합니다")
        .max(32, "비밀번호는 32자 미만이어야 합니다"),
})
