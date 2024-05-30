<script>
    export let data;
</script>

<table class="table-auto">
    <thead>
        <tr>
            <th class=""> Title </th>
            <th class="w-1/6"> Name </th>
            <th class="w-1/6"> Date </th>
        </tr>
    </thead>
    <tbody>
        {#if data.posts.length > 0}
            {#each data.posts as post}
                <tr>
                    <td class="text-center"
                        ><a href="/board/detail/{post.id}">{post.title}</a
                        ></td
                    >
                    <td class="text-center">{post.name}</td>
                    <td class="text-center">{post.createdAt}</td>
                </tr>
            {/each}
        {:else}
            <p>게시물이 없습니다.</p>
        {/if}
    </tbody>
</table>

<!-- 페이지네이션 -->
{#if data.totalPosts > data.pageSize}
    <nav class="relative container mx-auto p-6">
        <div class="flex items-center justify-between">
            <div></div>
            <div>
                <div class="space-x-6 flex">
                    {#each Array.from({ length: Math.ceil(data.totalPosts / data.pageSize) }, (_, index) => index + 1) as page}
                        <div class:active={data.currentPage === page}>
                            <a
                                href={`?page=${page}&search=${data.search}`}
                                class:active={data.currentPage === page}
                                >{page}</a
                            >
                        </div>
                    {/each}
                </div>
            </div>
            <div></div>
        </div>
    </nav>
{/if}

<div class="mt-6 flex justify-between">
    <div>
        <a href="/board/write">
            <button class="specialBtn">
                <p class="text-base sm:text-lg md:text-xl">글쓰기</p>
            </button>
        </a>
    </div>
    <div>
        <form>
            <input
                name="search"
                type="text"
                class="border-gray-300 border-2 rounded-md px-4 py-2"
                placeholder="검색어를 입력하세요"
            />
            <button class="specialBtnDark">
                <p class="text-base sm:text-lg md:text-xl">검색</p>
            </button>
        </form>
    </div>
</div>
