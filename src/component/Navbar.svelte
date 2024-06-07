<script>
    import { signOut } from "@auth/sveltekit/client";
    import Sidemenu from "./Sidemenu.svelte";
    import { page } from "$app/stores";
</script>

<Sidemenu />

<nav class="fixed flex items-center justify-between w-full bg-[#031003] z-10">
    <div class="h-[54px] w-[54px]" />
    <a href="/">
        <div class="font-bold text-xl">부천노래클럽</div>
    </a>
    <div>
        {#if $page.data.session}
            <button on:click={signOut}>signOut</button>
            <span class="material-icons md-36"> login </span>
        {:else}
            <a href="/signin">
                <span class="material-icons md-36"> login </span>
            </a>
        {/if}
    </div>
</nav>

<!--  -->
<div class="h-[54px] w-[54px]" />
