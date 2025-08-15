<script lang="ts">
    import TrackCard from "$lib/components/TrackCard.svelte";
    import { getAllRelated, getRelated } from "$lib/remote/sc.remote.js";
    import type { SoundcloudTrack } from "soundcloud.ts-light";
    import { onMount } from "svelte";

    const { data } = $props();

    let related: SoundcloudTrack[] = $state([]);

    function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array]; // copy to avoid mutating original
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return arr;
    }

    onMount(async () => {
        if (data.me) {
            related = await getAllRelated({
                userResolvable: data.me.id.toString(),
            });
        }
    });
</script>

<svelte:head>
    <title>krach music player</title>
</svelte:head>

{#if data.meLikes}
    <div class="flex flex-wrap gap-4 items-center justify-center m-4">
        {#each shuffleArray<SoundcloudTrack>(related) as r}
            <TrackCard track={r} />
        {/each}
    </div>
{/if}
