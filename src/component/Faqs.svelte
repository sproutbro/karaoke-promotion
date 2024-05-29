<script>
    let faqs = [
        {
            question: "혼자가도 되나요?",
            ans: "혼자오셔도 감사",
        },
        {
            question: "추가금액은 없나요?",
            ans: "맥주 안주 TC 까지 모두 포함된 금액입니다.",
        },
        {
            question: "아가씨 나이대는?",
            ans: "전부 20입니다.",
        },
    ];
</script>

<section id="faqs">
    <div class="flex flex-col items-center justify-center py-10">
        <div class="flex flex-col gap-2 mb-10">
            <p class="opacity-60 text-base text-center">
                고객분들이 궁금해하시는 모든것.
            </p>
            <h3 class="text-3xl mx-auto w-full text-center">자주묻는 질문</h3>
        </div>
        <div class="flex flex-col w-full gap-10">
            {#each faqs as faq}
            <div
                class="flex flex-col gap-2 text-left max-w-[340px] w-full mx-auto relative p-4 px-6"
            >
                <div
                    class="absolute top-0 left-0 w-1/3 h-[1px] bg-slate-100 -translate-x-4"
                ></div>
                <div
                    class="absolute top-0 left-0 h-2/3 w-[1px] bg-slate-100 -translate-y-4"
                ></div>
                <h4 class="text-lg sm:text-xl md:text-2xl pt-2">
                    {faq.question}
                </h4>
                <p class="pl-2">{faq.ans}</p>
            </div>
            {/each}
        </div>
    </div>
</section>
