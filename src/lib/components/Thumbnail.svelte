<script lang="ts">
    import { Music } from "lucide-svelte";

    const { src, classNames }: { src?: string; classNames?: string } = $props();
</script>

<div
    class=" rounded-md {classNames} bg-red-300 flex items-center justify-center aspect-square"
>
    {#if src}
        <img class=" rounded-md aspect-square" {src} alt="" />
    {:else}
        <Music />
    {/if}
</div>
