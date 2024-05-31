<script>
    import HamburgerIcon from "../component/HamburgerIcon.svelte";
    import { sideActive, hamburgerActive, menu } from "$lib/store.js";
    import Chat from "../routes/chat/+page.svelte";

    function toggleMenu() {
        hamburgerActive.update((v) => !v);
        sideActive.set($hamburgerActive);
    }
</script>

<button class="fixed z-30" on:click={toggleMenu}>
    <HamburgerIcon />
</button>
<div class="overlay" class:active={$sideActive}>
    <div></div>
    <div class="flex flex-col space-y-5">
        {#each menu as { href, name }}
            <a {href}>
                <div
                    class="border rounded-md duration-700 hover:bg-white hover:text-black px-6 py-4"
                >
                    {name}
                </div>
            </a>
        {/each}
    </div>

    <div class="w-full px-4 pb-5">
        <div class="flex justify-around">
            <a href="tel:01099225375">
                <img src="./icon/call.png" alt="부천노래방 | Call icon" />
            </a>
            <img
                class="image-brand"
                src="./icon/kakao.png"
                alt="부천노래방 | KaKao icon"
            />
            <Chat />
        </div>
    </div>
</div>

<style>
    .image-brand {
        filter: invert(100%);
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
        right: 100%;
        transition: all 600ms;
        z-index: 20;
    }
    .overlay.active {
        right: 0;
    }
</style>
