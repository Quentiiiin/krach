<script lang="ts">
    import PlayButton from "$lib/components/PlayButton.svelte";
    import TrackEntry from "$lib/components/TrackEntry.svelte";
    import { getSearchResults } from "$lib/remote/sc.remote.js";
    import { intersect, type IntersectDetail } from "@svelte-put/intersect";
    import type { SoundcloudTrack } from "soundcloud.ts";

    const { data } = $props();

    let newResults: SoundcloudTrack[] = $state([]);

    const allResults = $derived.by(() => {
        const firstResults = data.results.current;
        if (firstResults) {
            return [...data.results.current, ...newResults];
        } else return [...newResults];
    });

    async function onIntersect(event: CustomEvent<IntersectDetail>) {
        const { observer, entries, direction } = event.detail;
        if (direction === "down") {
            const results = await getSearchResults({
                term: data.term,
                offset: allResults.length,
            });
            newResults = [...newResults, ...results];
        }
    }
</script>

{#await data.results}
    loading...
{:then}
    <ul>
        {#each allResults as result, index}
            <li class="m-2">
                <TrackEntry track={result} />
                {#if index % 5 === 0 && index > 1}
                    <div
                        class=" border border-amber-400"
                        use:intersect
                        onintersectonce={onIntersect}
                    ></div>
                {/if}
            </li>
        {/each}
    </ul>
    <div use:intersect onintersect={onIntersect}>loading...</div>
{/await}
