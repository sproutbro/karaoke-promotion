<script>
  import "../app.css";
  import Navbar from "../component/Navbar.svelte";
  import NavbarAdmin from "../component/NavbarAdmin.svelte";

  export let data;
</script>

{#if !data.admin}
  <Navbar />
{:else}
  <NavbarAdmin />
{/if}
<slot />
