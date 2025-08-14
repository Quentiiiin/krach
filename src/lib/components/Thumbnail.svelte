<script lang="ts">
    import { getArtworkSizes } from "$lib/util";
    import { Music } from "lucide-svelte";

    const {
        src,
        classNames,
        full,
    }: { src?: string; classNames?: string; full?: boolean } = $props();

    // svelte-ignore non_reactive_update
    let sizes = $derived.by(() => {
        if (!src) return { small: "", medium: "", full: "" };
        return getArtworkSizes(src);
    });
</script>

<div
    class=" rounded-md {classNames} bg-red-300 flex items-center justify-center aspect-square"
>
    {#if src}
        <img
            loading="lazy"
            src={full ? sizes.full : sizes.medium}
            class=" aspect-square rounded-md"
            alt=""
        />
    {:else}
        <span class=" aspect-square rounded-md">
            <Music />
        </span>
    {/if}
</div>
