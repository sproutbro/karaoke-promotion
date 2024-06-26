import { writable } from "svelte/store";

export let hamburgerActive = writable(false);
export let sideActive = writable(false);
export let chatActive = writable(false);
export let modalActive = writable(false);
export let currentNavbar = writable(0);

export let menu = [
    { href: "/", name: "Home" },
    { href: "/notice", name: "공지사항" },
    { href: "/#faqs", name: "자주묻는질문" },
    { href: "/gallery", name: "갤러리" },
    { href: "/reviews", name: "고객후기" },
    { href: "/#map", name: "오시는길" },
];