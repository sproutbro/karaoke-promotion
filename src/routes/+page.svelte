<script>
    import Carousel from "../component/Carousel.svelte";
    import Map from "../component/Map.svelte";
    import Faqs from "../component/Faqs.svelte";
</script>

<svelte:head>
    <title
        >부천노래방 | 부천퍼블릭가라오케 | 신중동노래방 | 부천퍼블릭 |
        부천노래클럽 | 부천역노래클럽 | 부천상동노래클럽 | 신중동노래클럽</title
    >
    <meta
        name="description"
        content="부천노래방 | 부천퍼블릭가라오케 | 신중동노래방 | 부천퍼블릭 |
    부천노래클럽 | 부천역노래클럽 | 부천상동노래클럽 | 신중동노래클럽"
    />
</svelte:head>

<div class="flex w-full justify-center pt-5">
    <img
        class="rounded-2xl"
        src="./banner5.gif"
        alt="부천노래방 | 부천퍼블릭가라오케 | 신중동노래방 | 부천퍼블릭 |
    부천노래클럽 | 부천역노래클럽 | 부천상동노래클럽 | 신중동노래클럽"
    />
</div>

<Carousel />
<Faqs />
<Map />
