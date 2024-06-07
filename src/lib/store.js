import { writable } from "svelte/store";

export let hamburgerActive = writable(false);
export let sideActive = writable(false);
export let chatActive = writable(false);
export let modalActive = writable(false);

export let menu = [
    { href: "/", name: "Home" },
    { href: "/#notice", name: "부천퍼블릭" },
    { href: "/#faqs", name: "자주묻는질문" },
    { href: "/reviews", name: "고객후기" },
    { href: "/#map", name: "오시는길" },
];