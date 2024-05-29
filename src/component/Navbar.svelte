<script>
    import HamburgerIcon from "../component/HamburgerIcon.svelte";
    import { hambugerActive } from "$lib/store.js";

    $: hambugerActive;

    let menu = [
        { href: "/", name: "Home" },
        { href: "#notice", name: "부천퍼블릭" },
        { href: "#faqs", name: "자주묻는질문" },
        { href: "#reviews", name: "고객후기" },
        { href: "#map", name: "오시는길" },
    ];
</script>

<div class="z-30 ml-5 {$hambugerActive ? 'fixed' : 'absolute'}">
    <button on:click={() => hambugerActive.set($hambugerActive ? false : true)}>
        <HamburgerIcon />
    </button>
</div>
<nav class="w-full top-0 left-0">
    <div class="flex justify-center items-center py-3 px-5 py-5">
        <div class="font-bold text-xl">부천노래클럽</div>
    </div>
</nav>
<div class="overlay" class:active={$hambugerActive}>
    <div
        class="flex flex-col justify-center items-center w-full h-full space-y-5"
    >
        <div
            class="flex flex-col justify-center items-center w-full h-full space-y-5"
        >
            {#each menu as { href, name }}
                <a {href} on:click={() => hambugerActive.set(false)}>
                    <div
                        class="
            text-lg border h-[46px] w-[190px] py-5 flex justify-center items-center rounded-md
            duration-700 hover:bg-white hover:text-black
            "
                    >
                        {name}
                    </div>
                </a>
            {/each}
        </div>
        <div>
            <!-- class="block px-4 py-3 mb-3 text-center hover:bg-green-600 rounded-xl" -->
            <a
                class="text-lg text-black h-[46px] w-[190px] py-5 flex bg-[#FAD932] justify-center items-center rounded-md
                duration-700 hover:bg-white hover:text-black
            "
                href="tel:01099225375">전화연결</a
            >
        </div>
        <p class="my-4 text-xs text-center text-gray-400 pb-10">
            <span>Designed by </span>
        </p>
    </div>
</div>

<style>
    .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
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
