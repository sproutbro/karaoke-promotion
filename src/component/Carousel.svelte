<script>
    import { fade } from "svelte/transition";

    let currentIndex = 0;

    let carousel_item = [
        {
            title: "저렴한주대",
            content:
                "합리적인 가격으로 최고의 경험을 즐기세요.<br/> 부담 없이 즐길 수 있는 저렴한 가격을 제공합니다.",
        },
        {
            title: "최강싸이즈",
            content:
                "부천 최고의 싸이즈, 텐프로, 쩜오, 피팅모델, 인스타 여신 <br />기본적인 마인드까지 탑재되어 있습니다",
        },
        {
            title: "극강마인드",
            content:
                "고객 중심의 서비스로 최상의 만족을 드립니다. <br/> 준비된 아가씨들이 항상 대기 중입니다.",
        },
    ];

    function prev() {
        currentIndex === 0
            ? (currentIndex = carousel_item.length - 1)
            : currentIndex--;
        slides(0);
    }

    function next() {
        currentIndex === carousel_item.length - 1
            ? (currentIndex = 0)
            : currentIndex++;
        slides(1);
    }
</script>

<div class="w-[360px] mx-auto">
    <div class="flex flex-col p-5 space-y-5">
        {#each carousel_item as { title, content }, i}
            {#if currentIndex === i}
                <div in:fade>
                    <h1 class="text-4xl py-5">{title}</h1>
                    <div>{@html content}</div>
                </div>
            {/if}
        {/each}
        <div>
            <a
                class="px-6 py-2 rounded-full text-black bg-[#FAD932]"
                href="tel:01099225375">전화연결</a
            >
        </div>
        <div class="flex items-center space-x-5">
            <button on:click={prev}>
                <div class="circle-arrow left hover:bg-[#FAD932]"></div>
            </button>
            <button on:click={next}>
                <div class="circle-arrow right hover:bg-[#FAD932]"></div>
            </button>
        </div>
    </div>
</div>

<style>
    .circle-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: 2px solid white;
        border-radius: 50%;
        position: relative;
    }

    .circle-arrow::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
    }

    .left::before {
        border-width: 6px 8px 6px 0;
        border-color: transparent white transparent transparent;
        transform: translateX(-2px);
    }

    .right::before {
        border-width: 6px 0 6px 8px;
        border-color: transparent transparent transparent white;
        transform: translateX(2px);
    }
</style>
