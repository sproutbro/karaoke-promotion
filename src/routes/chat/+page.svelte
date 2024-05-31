<script>
    import { chatActive } from "$lib/store.js";
    import { enhance } from "$app/forms";
    import { io } from "socket.io-client";
    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();
    
    async function toggleChat() {
        chatActive.update((value) => !value);
        const res = await fetch("/chat")
    }
    
    let socket = function setChat() {
        return io("http://127.0.0.1:3000/");
    }
</script>

<button on:click={toggleChat}>
    <img
        class="image-brand"
        src="./icon/chat.png"
        alt="부천노래방 | Chat icon"
    />
</button>

{#if $chatActive}
    <!-- <div class="overlay" class:active={$chatActive}></div> -->
    <div
        class="chat-container overflow-hidden bg-white text-black flex flex-col items-center rounded-2xl border"
    >
        <div class="bg-gray-200 px-40 py-3 flex items-center">
            <span class="material-symbols-outlined"> chat </span>
            &nbsp;&nbsp;
            <h1 class="text-center text-lg font-semibold">실시간메시지</h1>
        </div>
        <div class="py-2 space-y-2">
            <img
                class="mx-auto"
                src="./favicon.png"
                alt="부천노래클럽 | admin logo"
                width="64"
                height="64"
            />
            <div>
                <p class="text-sm font-semibold pt-4">
                    운영자가 즉시 답변합니다.
                </p>
                <p class="text-sm text-gray-400">오후 6시 - 오전 6시</p>
            </div>
        </div>
        <div class="chat-box overflow-y w-full h-[450px]"></div>
        <form method="post" action="?/sendMsg" class="w-full" use:enhance>
            <div class="flex justify-between w-full border rounded-full">
                <input class="w-full mx-4" type="text" name="chatMsg"/>
                <button class="flex border px-4 py-2 rounded-full bg-[#FAD932]"
                    ><span class="material-symbols-outlined">
                        subdirectory_arrow_left
                    </span>
                </button>
            </div>
        </form>
    </div>
{/if}

<style>
    .chat-container {
        position: fixed;
        bottom: 5rem;
        right: 1.25rem;
    }
    .chat-box {
        overflow-y: scroll;
    }
    .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        background: rgba(3, 16, 3, 0.95);
        overflow-x: hidden;
        left: 100%;
        transition: all 600ms;
        z-index: 20;
    }
    .overlay.active {
        left: 0;
    }
    .image-brand {
        filter: invert(100%);
    }
</style>
