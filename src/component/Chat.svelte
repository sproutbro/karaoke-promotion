<script>
    import { chatActive } from "$lib/store.js";
    import { enhance } from "$app/forms";
    import { io } from "socket.io-client";
    import { page } from "$app/stores";
    import Modal from "../component/Modal.svelte";
    import { modalActive } from "$lib/store.js";
    import { onMount } from "svelte";

    let socket;
    let message = "";

    function toggleChat() {
        if (!$page.data.session) {
            modalActive.set(true);
        } else {
            chatActive.update((value) => !value);
            if ($chatActive) {
                getChatMsg();
            } else {
                socket.on("disconnect", () => {
                    console.log("Disconnected from server");
                });
            }
        }
    }

    async function getChatMsg() {
        try {
            const response = await fetch("/api/chat");
            const data = await response.json();
            // messages.set(data);
        } catch (error) {
            throw error;
        }
    }

    function sendMsg(e) {
        e.preventDefault();
        if (message) {
            const toUserId = "admin";
            const item = document.createElement("li");
            item.style.textAlign = "right";
            item.textContent = message;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            socket.emit("send message", { toUserId, message });
            message = "";
        }
    }

    onMount(() => {
        socket = io();
        socket.emit("register", $page.data.session.user.email);
        // socket = io();

        // chatting 연결중
        socket.on("receive message", (data) => {
            console.log(`Message from ${data.from}: ${data.message}`);
            const item = document.createElement("li");
            item.textContent = data.message;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
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
        md:bottom-1 md:right-1 md:max-w-lg w-full overflow-hidden bg-white text-black flex flex-col items-center rounded-2xl border"
    >
        <div class="flex justify-between max-w-lg w-full bg-gray-200 px-6">
            <div></div>
            <div class="flex items-center">
                <span class="material-symbols-outlined"> chat </span>
                &nbsp;&nbsp;
                <h1 class="text-center text-lg font-semibold">실시간메시지</h1>
            </div>
            <button on:click={toggleChat}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="54px"
                    viewBox="0 -960 960 960"
                    width="54px"
                    fill="#5f6368"
                    ><path
                        d="M180-120q-24 0-42-18t-18-42v-210h60v210h600v-600H180v210h-60v-210q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm233-167-45-45 118-118H120v-60h366L368-628l45-45 193 193-193 193Z"
                    /></svg
                >
            </button>
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
        <div class="chat-box overflow-y w-full h-[450px]">
            <ul id="messages"></ul>
        </div>
        <form
            method="post"
            action="/api/chat"
            class="w-full"
            use:enhance
            on:submit={sendMsg}
        >
            <div class="flex justify-between w-full border rounded-full">
                <input
                    class="w-full mx-4"
                    type="text"
                    name="content"
                    bind:value={message}
                />
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
    /* .chat-container {
        position: fixed;
        bottom: 5rem;
        right: 1.25rem;
    } */
    .chat-box {
        overflow-y: scroll;
    }
    .image-brand {
        filter: invert(100%);
    }
    /* .overlay {
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
    } */
</style>
