<script>
    import { chatActive } from "$lib/store.js";
    import { enhance } from "$app/forms";
    import { io } from "socket.io-client";
    import { page } from "$app/stores";
    import Modal from "../component/Modal.svelte";
    import { modalActive } from "$lib/store.js";

    let socket;
    let messages = "";

    function toggleChat() {
        // 로그인 안했을경우 모달
        if (!$page.data.session) {
            modalActive.set(true);
        } else {
            // 채팅창 토글
            chatActive.update((value) => !value);
        }
    }

    chatActive.subscribe((value) => {
        if (value) {
            chatConfig();
        } else {
            if (socket) {
                socket.disconnect();
            }
        }
    });

    function sendMsg(e) {
        const message = e.currentTarget.message.value;
        if (message) {
            // 메세지 전송 메세지창추가
            const item = document.createElement("li");
            item.style.textAlign = "right";
            item.textContent = message;
            messages.appendChild(item);
            e.currentTarget.message.value = "";
            const chat_box = document.querySelector(".chat-box");
            chat_box.scrollTo(0, chat_box.scrollHeight);

            // 메세지 전송
            socket.emit("send message", { toUserId: "admin", message });
        }
    }

    async function chatConfig() {
        // 메세지와 Socket 서버 정보 가져오기
        const response = await fetch("/api/chat");
        const chatData = await response.json();

        // 메세지창 추가
        chatData.data.sort((a, b) => a.id - b.id);
        chatData.data.forEach((element) => {
            const item = document.createElement("li");
            // 유저글일경우 오른쪽정렬
            if (!element.admin) {
                item.style.textAlign = "right";
            }
            item.textContent = element.content;
            messages.appendChild(item);
            const chat_box = document.querySelector(".chat-box");
            chat_box.scrollTo(0, chat_box.scrollHeight);
        });

        // Socket 연결
        if (chatData.IS_LOCAL) {
            socket = io("http://localhost:3000", { cors: { origin: "*" } });
        } else {
            socket = io();
        }
        socket.emit("register", $page.data.session.user.email);

        // Socket 감지
        socket.on("receive message", (data) => {
            // 메세지창 추가
            const item = document.createElement("li");
            item.textContent = data.message;
            messages.appendChild(item);
            const chat_box = document.querySelector(".chat-box");
            chat_box.scrollTo(0, chat_box.scrollHeight);
        });
    }
</script>

<Modal />

<button on:click={toggleChat}>
    <img
        class="image-brand"
        src="./icon/chat.png"
        alt="부천노래방 | Chat icon"
    />
</button>

{#if $chatActive}
    <div
        class="fixed top-0 left-0
        md:bottom-1 md:right-1 md:max-w-lg w-full h-full overflow-hidden bg-white text-black flex flex-col items-center rounded-2xl border"
    >
        <div class="flex justify-center md:max-w-lg w-full bg-gray-200 p-3">
            <div class="flex items-center">
                <span class="material-symbols-outlined"> chat </span>
                &nbsp;&nbsp;
                <h1 class="text-center text-lg font-semibold">실시간메시지</h1>
            </div>
        </div>
        <div class="py-2 space-y-2">
            <img
                class="mx-auto"
                src="./icon/Logo.png"
                alt="부천노래클럽 | admin logo"
                width="64"
                height="64"
            />
            <div>
                <p class="text-sm font-semibold pt-4">
                    확인하는대로 즉시 답장드립니다.
                </p>
                <p class="text-sm text-gray-400">오후 6시 - 오전 6시</p>
            </div>
        </div>
        <div class="chat-box overflow-y w-full h-full">
            <ul id="messages" bind:this={messages}></ul>
        </div>
        <form
            method="post"
            action="/api/chat"
            class="w-full"
            use:enhance
            on:submit={sendMsg}
        >
            <div class="flex justify-between w-full border rounded-full">
                <input type="hidden" name="toUserId" value="admin" />
                <input class="w-full mx-4" type="text" name="message" />
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
    .chat-box {
        overflow-y: scroll;
    }
    .image-brand {
        filter: invert(100%);
    }
</style>
