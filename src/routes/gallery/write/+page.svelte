<script>
    import { enhance } from "$app/forms";
</script>

<div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">글쓰기 폼</h1>
    <form
        class="max-w-lg mx-auto"
        method="post"
        enctype="multipart/form-data"
        use:enhance
    >
        <div class="mb-4">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="title">제목</label
            >
            <input
                id="title"
                name="title"
                type="text"
                placeholder="제목을 입력하세요."
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="mb-6">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="content">내용</label
            >
            <textarea
                id="content"
                name="content"
                placeholder="내용을 입력하세요."
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
        </div>
        <div class="mb-6">
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="content">이미지 파일</label
            >
            <input type="file" name="image" />
        </div>
        <div class="flex items-center justify-between">
            <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >글쓰기</button
            >
        </div>
    </form>
</div>
