<script>
    import Navbar from "../component/Navbar.svelte";
    import { hambugerActive } from "$lib/store.js";
    import Carousel from "../component/Carousel.svelte";
    import Map from "../component/Map.svelte";
    import Faqs from "../component/Faqs.svelte";

    $: hambugerActive;
</script>

<Navbar />

<div class="flex w-full justify-center pt-5">
    <img class="rounded-2xl" src="./banner5.gif" alt="부천 노래방" />
</div>

<div id="notice">
    <Carousel />
</div>
<Faqs />
<Map />
