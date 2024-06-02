<script>
    import { modalActive } from "$lib/store.js";
    $: modalActive;
    let modalBox = "";

    function modalClose(e) {
        if (e.target === modalBox) {
            modalActive.set(false);
        }
    }
</script>

<section>
    <button on:click={modalClose}>
        <!-- 오버레이 -->
        <div class="overlay" class:active={$modalActive} bind:this={modalBox}>
            <!-- 모달창 -->
            <div class="w-full max-w-80 rounded-xl overflow-hidden">
                <!-- 모달로고 -->
                <div
                    class="flex flex-col justify-center items-center bg-yellow-400 py-10 space-y-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100px"
                        viewBox="0 -960 960 960"
                        width="100px"
                        fill="#FFFFFF"
                        ><path
                            d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q145 0 242.5-97.5T820-480q0-30-4.5-58.5T802-594l46-46q16 37 24 77t8 83q0 85-31 158t-85 127q-54 54-127 84.5T480-80Zm-59-218L256-464l45-45 120 120 414-414 46 45-460 460Z"
                        /></svg
                    >
                    <h1>회원가입이 완료되었습니다</h1>
                </div>
                <!-- 모달텍스트 -->
                <div
                    class="flex flex-col items-center bg-gray-200 p-8 space-y-6"
                >
                    <p class="text-gray-500 break-words">
                        축하합니다. 귀하의 계정이 성공적으로 생성되었습니다.
                    </p>
                    <!-- <button on:click={modalClose}> -->
                    <a href="/auth/signin">
                        <div
                            class="duration-700 bg-yellow-400 py-3 px-6 rounded-full shadow-md
                        hover:bg-white hover:text-black hover:shadow-2xl"
                        >
                            로그인하러가기
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </button>
</section>

<style>
    .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 600ms;
        z-index: 20;

        /*  */
        pointer-events: none;
        opacity: 0;
    }
    .overlay.active {
        background: rgba(3, 16, 3, 0.95);
        opacity: 1;
        pointer-events: all;
    }
</style>
