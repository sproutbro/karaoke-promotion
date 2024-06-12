<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<section>
    <div class="w-full max-w-screen-lg mx-auto">
        <h2 class="text-3xl p-6">공지사항</h2>
        {#if 0 < data.notices.length}
            <ul>
                {#each data.notices as { id, title, content, createdAt, _count }}
                    <li>
                        <a href="/notice/detail/{id}">
                            <div
                                class="p-6 space-y-4 border-b hover:bg-gray-800 duration-500"
                            >
                                <p class="text-sm">{createdAt}</p>
                                <h3 class="text-xl font-bold">
                                    {title}
                                    {#if 0 < _count.NoticeComment}
                                        <span>[{_count.NoticeComment}]</span>
                                    {/if}
                                </h3>
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</section>
