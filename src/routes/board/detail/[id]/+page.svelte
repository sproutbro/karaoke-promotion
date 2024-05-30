<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";

    export let data;
</script>

<div class="container mx-auto p-6">
    <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="px-6 py-4">
            <h1 class="text-3xl font-semibold text-gray-800 mb-4">
                {data.post.title}
            </h1>
            <pre>
                    <pre class="text-gray-600">{data.post.content}</pre>
                </pre>
            {#if data.comments}
                <h1 class="text-3xl font-semibold text-gray-800 mb-4">댓글</h1>
                {#each data.comments as comment}
                    <div>
                        {comment.content}
                    </div>
                {/each}
            {/if}
        </div>
        <div
            class="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center"
        >
            <span class="text-xs text-gray-500">{data.post.createdAt}</span>
            <button
                on:click={() => history.back()}
                class="text-sm text-indigo-400 hover:blue focus:outline-none"
            >
                뒤로 가기
            </button>
        </div>
    </div>

    {#if $page.data.session}
        <div
            class="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden"
        >
            <form method="post" use:enhance>
                <input name="comment" type="text" />
                <button>댓글달기</button>
            </form>
        </div>
    {/if}
</div>
