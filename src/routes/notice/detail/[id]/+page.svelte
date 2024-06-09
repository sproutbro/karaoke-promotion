<script>
    import { enhance } from "$app/forms";

    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data);
</script>

<section>
    <div class="w-full max-w-screen-lg mx-auto">
        <h2 class="text-3xl p-6">{data.notice.title}</h2>
        <div class="p-6 space-y-4 border-b">
            <p class="text-sm">{data.notice.createdAt}</p>
            <h3 class="text-xl font-bold">{data.notice.title}</h3>
            <p>{data.notice.content}</p>
        </div>
        <div class="px-10 py-6 space-y-4">
            <h3>댓글</h3>
            {#if 0 < data.noticeComments.length}
                {#each data.noticeComments as { id, content, name, createdAt, email }}
                    <div class="border-b space-y-2">
                        <p class="text-sm">{name}</p>
                        <div>
                            <p>{content}</p>
                            <div class="flex justify-between text-xs">
                                <p>{createdAt}</p>
                                {#if data.session}
                                    {#if email === data.session.user.email || "krsproutbro@gmail.com" === data.session.user.email}
                                        <form method="post" use:enhance>
                                            <input
                                                type="hidden"
                                                name="id"
                                                value={id}
                                            />
                                            <button>댓글삭제</button>
                                        </form>
                                    {/if}
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
            {#if data.session}
                <form class="text-sm" method="post" use:enhance>
                    <input
                        type="hidden"
                        name="noticeId"
                        value={data.notice.id}
                    />
                    <textarea class="w-full text-black" name="content"
                    ></textarea>
                    <div class="flex justify-between">
                        <label for="anonymous">
                            익명댓글
                            <input
                                type="checkbox"
                                name="anonymous"
                                id="anonymous"
                            />
                        </label>
                        <button>댓글쓰기</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</section>
