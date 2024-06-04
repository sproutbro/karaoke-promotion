<script>
    import { SignIn } from "@auth/sveltekit/components";
</script>

<section>
    <div class="absolute flex justify-center w-full h-full">
        <div class="rounded-xl overflow-hidden">
            <div class="p-6 space-y-2 bg-yellow-300 max-w-screen-md">
                <h1 class="text-xl text-black">Walcom!</h1>
                <img
                    class="mx-auto rounded-xl overflow-hidden"
                    src="./icon/Logo.png"
                    width="250"
                    alt="부천 노래방 | 로고"
                />
            </div>
            <div class="flex flex-col items-center space-y-4 py-4">
                <SignIn provider="google">
                    <div
                        slot="submitButton"
                        class="flex w-[280px] border rounded-xl px-4 py-3 space-x-6
                        hover:bg-blue-400 duration-500"
                    >
                        <img
                            loading="lazy"
                            height="24"
                            width="24"
                            id="provider-logo"
                            src="https://authjs.dev/img/providers/google.svg"
                            alt="google-logo"
                        />
                        <span>구글로 로그인</span>
                    </div>
                </SignIn>
                <SignIn provider="kakao">
                    <div
                        slot="submitButton"
                        class="flex w-[280px] border rounded-xl px-4 py-3 space-x-6
                        hover:bg-yellow-400 duration-500"
                    >
                        <img
                            loading="lazy"
                            height="24"
                            width="24"
                            id="provider-logo"
                            src="https://authjs.dev/img/providers/kakao.svg"
                            alt="google-logo"
                        />
                        <span>카카오로 로그인</span>
                    </div>
                </SignIn>
            </div>
        </div>
    </div>
</section>
