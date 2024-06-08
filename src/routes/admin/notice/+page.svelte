<script>
    import { enhance } from "$app/forms";

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<section>
    <form class="registerForm" method="post" use:enhance>
        <label for="noticeTitle">제목</label>
        <input type="text" name="noticeTitle" id="noticeTitle" required />
        <label for="noticeContent">공지내용</label>
        <textarea name="noticeContent" id="noticeContent" rows="5" />
        <label for="createdAt">작성일</label>
        <input type="date" name="createdAt" id="createdAt" />
        <button>신규공지등록</button>
    </form>
    {#if form?.success}
        <button>Successfully</button>
    {/if}
    {#if data.notice.length}
        {#each data.notice as { id, title, content, createdAt }}
            <form class="registerForm" method="post" use:enhance>
                <input type="hidden" name="id" value={id} />
                <label for="noticeTitle">제목</label>
                <input
                    type="text"
                    name="noticeTitle"
                    id="noticeTitle"
                    value={title}
                    required
                />
                <label for="noticeContent">공지내용</label>
                <textarea
                    name="noticeContent"
                    id="noticeContent"
                    rows="5"
                    value={content}
                />
                <label for="createdAt">작성일 : {createdAt}</label>
                <input type="date" name="createdAt" id="createdAt" />
                <button>수정</button>
                <form method="post" use:enhance>
                    <input type="hidden" name="id" value={id} />
                    <button>삭제</button>
                </form>
            </form>
        {/each}
    {/if}
</section>

<style>
    section {
        padding: 10px;
        color: black;
    }
    label {
        color: white;
    }
    button {
        color: white;
        border: 1px solid white;
        padding: 5px 30px 5px 30px;
        width: fit-content;
        border-radius: 10px;
    }
    .registerForm {
        display: flex;
        flex-direction: column;
        margin: 5px;
        padding: 5px;
    }
</style>
