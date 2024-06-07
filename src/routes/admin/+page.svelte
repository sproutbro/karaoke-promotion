<script>
    import { io } from "socket.io-client";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { enhance } from "$app/forms";

    let socket;
    let messages = "";
    let userId = writable([]);
    let chatData = [];
    let toUserId = "";

    function handleSubmit(e) {
        const message = e.currentTarget.content.value;
        if (message) {
            const item = document.createElement("li");
            item.style.textAlign = "right";
            item.textContent = message;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            e.currentTarget.content.value = "";
        }
    }

    // 클릭한 유저의 메세지기록 메세지창에 입력
    async function showMessages(e) {
        // 메세지와 Socket 서버 정보 가져오기
        const { data } = await getData();
        chatData = data;

        // toUserId 에 선택한 유저입력
        toUserId = e.target.innerText;

        // 선택유저 메세지 필터
        const filterdChat = chatData.filter(
            (element) => element.userId == toUserId,
        );

        // 메세지창에 입력
        messages.textContent = null;
        filterdChat.forEach((element) => {
            const item = document.createElement("li");
            item.textContent = element.content;
            // admin 글일경우 오른쪽정렬
            if (element.admin) {
                item.style.textAlign = "right";
            }
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    // 메세지와 Socket 서버 정보 가져오기
    async function getData() {
        const response = await fetch("/api/chat");
        return await response.json();
    }

    onMount(async () => {
        // 메세지와 Socket 서버 정보 가져오기
        const { data, IS_LOCAL } = await getData();
        chatData = data;

        // 메세지 보낸아이디 배열에 담기
        userId.update((arr) => {
            chatData.forEach((element) => {
                if (!arr.includes(element.userId)) {
                    arr.push(element.userId);
                }
            });
            return arr;
        });

        // Socket 연결
        if (IS_LOCAL) {
            socket = io("http://localhost:3000", { cors: { origin: "*" } });
        } else {
            socket = io();
        }
        socket.emit("register", "admin");

        // Socket 감지
        socket.on("receive message", (data) => {
            // 메세지창 추가
            const item = document.createElement("li");
            item.textContent = data.message;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
</script>

{#each $userId as user}
    <div>
        <button on:click={showMessages}>{user}</button>
    </div>
{/each}

<ul id="messages" bind:this={messages}></ul>
<form
    class="text-black"
    id="form"
    action="/api/chat"
    method="post"
    use:enhance
    on:submit={handleSubmit}
>
    <input type="hidden" name="toUserId" value={toUserId} />
    <input id="input" name="content" autocomplete="off" />
    <button>Send</button>
</form>

<style>
    #form {
        background: rgba(0, 0, 0, 0.15);
        padding: 0.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 3rem;
        box-sizing: border-box;
        backdrop-filter: blur(10px);
    }

    #input {
        border: none;
        padding: 0 1rem;
        flex-grow: 1;
        border-radius: 2rem;
        margin: 0.25rem;
    }

    #input:focus {
        outline: none;
    }

    #form > button {
        background: #333;
        border: none;
        padding: 0 1rem;
        margin: 0.25rem;
        border-radius: 3px;
        outline: none;
        color: #fff;
    }

    #messages {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>
