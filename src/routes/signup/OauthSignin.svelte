<script>
    export let buttonTitle;
    export let action;
    export let src;
    export let alt;
</script>

<form {action} method="POST">
    <input
        type="hidden"
        name="csrfToken"
        value="1a65d4274305004467998d133735b777749cff663b64849ac5c76047f0463384"
    /><input
        type="hidden"
        name="callbackUrl"
        value="http://localhost:5173/signup"
    /><button
        type="submit"
        class="flex space-x-4 w-full py-3 px-6 border text-white rounded-xl"
        ><img
            loading="lazy"
            height="24"
            width="24"
            id="provider-logo"
            {src}
            {alt}
        /><span>{buttonTitle}</span></button
    >
</form>
