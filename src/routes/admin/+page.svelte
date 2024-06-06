<script>
    import { io } from "socket.io-client";
    import { onMount } from "svelte";
    let socket = io();
    socket.emit("register", "admin");

    export let data;

    let form = "";
    let input = "";
    let messages = "";
    let userMessages = "";

    function handleSubmit(e) {
        e.preventDefault();
        if (input.value) {
            const toUserId = e.currentTarget.userId.value;
            const message = input.value;
            socket.emit("send message", { toUserId, message });
            input.value = "";
        }
    }

    socket.on("receive message", (data) => {
        console.log(`Message from ${data.from}: ${data.message}`);
        const item = document.createElement("li");
        item.textContent = data.message;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    const groupedDataMap = data.chat.reduce((acc, obj) => {
        const key = obj.userId;
        if (!acc.has(key)) {
            acc.set(key, []);
        }
        acc.get(key).push(obj);
        return acc;
    }, new Map());

    onMount(() => {
        groupedDataMap.forEach((value, key) => {
            console.log(`${key}:`, value);
            let ul = document.createElement("ul");
            let h1 = document.createElement("h1");
            h1.innerText = key;
            value.forEach((value) => {
                let li = document.createElement("li");
                li.innerText = value.content;
                ul.appendChild(li);
            });
            userMessages.appendChild(h1);
            userMessages.appendChild(ul);
        });
    });
</script>

<div bind:this={userMessages}></div>

<ul id="messages" bind:this={messages}></ul>
<form
    class="text-black"
    id="form"
    action=""
    bind:this={form}
    on:submit={handleSubmit}
>
    <input type="text" name="userId" />
    <input id="input" autocomplete="off" bind:this={input} /><button
        >Send</button
    >
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

    #messages > li {
        padding: 0.5rem 1rem;
    }

    #messages > li:nth-child(odd) {
        background: #efefef;
    }
</style>
