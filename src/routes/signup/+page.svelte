<script>
    import Modal from "../../component/Modal.svelte";
    import OauthSignin from "./OauthSignin.svelte";

    let emailErrorMessage = "";
    let passwordErrorMessage = "";

    // 유저생성
    async function creaateUser(body) {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body,
            });

            const jsonData = await response.json();

            // email 중복 error
            if (response.status == 422) {
                emailErrorMessage = jsonData.message;
            }

            // validate error
            if (response.status == 400) {
                if (jsonData.email) {
                    emailErrorMessage = jsonData.email._errors;
                } else {
                    emailErrorMessage = "";
                }

                if (jsonData.password) {
                    passwordErrorMessage = jsonData.password._errors;
                } else {
                    passwordErrorMessage = "";
                }
            }

            if (response.ok) {
                console.log(jsonData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 회원가입 요청
    function handleSubmit(e) {
        e.preventDefault();
        const body = new FormData(e.currentTarget);
        const password = body.get("password");
        const repeatPassword = body.get("repeatPassword");
        if (password === repeatPassword) {
            creaateUser(body);
        } else {
            passwordErrorMessage = "비밀번호가 일치하지 않습니다.";
        }
    }
</script>

<Modal />

<section>
    <div
        class="fixed top-0 left-0 w-full h-full z-10 rounded-xl overflow-hidden"
    >
        <div
            class="w-full h-full mx-auto rounded text-black
            md:max-w-screen-md overflow-y-auto"
        >
            <!-- Logo box start -->
            <div class="p-12 space-y-2 bg-gray-200">
                <h1 class="text-xl text-black">Walcom!</h1>
                <img
                    class="mx-auto rounded-xl overflow-hidden"
                    src="./icon/Logo.png"
                    width="250"
                    alt="부천 노래방 | 로고"
                />
                <p class="text-gray-400">회원이신가요?</p>
                <a href="/auth/signin">
                    <p
                        class="font-bold underline underline-offset-5 hover:text-white duration-500"
                    >
                        로그인하러가기
                    </p>
                </a>
            </div>
            <!-- Logo box end -->
            <div class="text-white p-12 space-y-8">
                <!-- Form start -->
                <h1 class="text-xl font-bold">이메일로 등록하세요</h1>
                <form class="space-y-2" on:submit={handleSubmit}>
                    <!-- Email Field -->
                    <div>
                        <label class="text-xs text-gray-200" for="email"
                            >이메일</label
                        >
                    </div>
                    <input
                        class="bg-[#031003] w-full border-b-2 border-gray-600 py-2 placeholder:text-gray-600
                        focus:outline-none focus:border-white duration-500"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="이메일"
                        required
                        autocomplete="email"
                    />
                    <div>
                        {emailErrorMessage}&nbsp
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label class="text-xs text-gray-200" for="password"
                            >비밀번호</label
                        >
                    </div>
                    <input
                        class="bg-[#031003] w-full border-b-2 border-gray-600 py-2 placeholder:text-gray-600
                        focus:outline-none focus:border-white duration-500"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="비밀번호"
                        required
                        autocomplete="new-password"
                    />
                    <div>&nbsp</div>

                    <!-- Repeat password Field -->
                    <div>
                        <label
                            class="text-xs text-gray-200"
                            for="repeatPassword">비밀번호 확인</label
                        >
                    </div>
                    <input
                        class="bg-[#031003] w-full border-b-2 border-gray-600 py-2 placeholder:text-gray-600
                        focus:outline-none focus:border-white duration-500"
                        type="password"
                        name="repeatPassword"
                        id="repeatPassword"
                        placeholder="비밀번호 확인"
                        required
                        autocomplete="new-password"
                    />
                    <div>
                        {passwordErrorMessage}&nbsp
                    </div>

                    <!-- Submit button -->
                    <button class="w-full text-black bg-white rounded-xl p-3"
                        >계정 만들기</button
                    >
                </form>
                <!-- Form end -->

                <!-- Oauth login start -->
                <div class="space-y-6 pt-6">
                    <p class="text-white">아니면 등록하세요</p>
                    <!-- {csrfToken} -->
                    <OauthSignin
                        buttonTitle="구글로 로그인"
                        action="http://localhost:5173/auth/signin/google"
                        src="https://authjs.dev/img/providers/google.svg"
                        alt="Google logo"
                    />
                    <!-- {csrfToken} -->
                    <OauthSignin
                        buttonTitle="카카오로 로그인"
                        action="http://localhost:5173/auth/signin/kakao"
                        src="https://authjs.dev/img/providers/kakao.svg"
                        alt="Kakao logo"
                    />
                </div>
            </div>
        </div>
    </div>
</section>

<style>
</style>
