<script lang="ts">
    import TrackEntry from "$lib/components/TrackEntry.svelte";
    import { getSearchResults } from "$lib/remote/sc.remote.js";
    import { intersect, type IntersectDetail } from "@svelte-put/intersect";
    import type { SoundcloudTrack } from "soundcloud.ts";

    const { data } = $props();

    let newResults: SoundcloudTrack[] = $state([]);

    let lastOffsetFetched = $state(0);

    let showWireFrame = $state(true);

    const allResults = $derived.by(() => {
        //check is required because else it errors on navigation
        if (!data.results) return [...newResults];

        const firstResults = data.results.current;
        if (firstResults) {
            return [...data.results.current, ...newResults];
        }
        return [...newResults];
    });

    async function onIntersect(event: CustomEvent<IntersectDetail>) {
        if (lastOffsetFetched < allResults.length) {
            lastOffsetFetched = allResults.length;
        } else {
            return;
        }
        const results = await getSearchResults({
            term: data.term,
            offset: allResults.length,
        });
        if (results.length === 0) {
            showWireFrame = false;
        }
        newResults = [...newResults, ...results];
    }
</script>

{#await data.results}
    {#each { length: 10 } as index}
        <li class=" m-2">
            <TrackEntry />
        </li>
    {/each}
{:then}
    <ul class="">
        {#each allResults as result, index}
            <li class="m-2">
                <TrackEntry track={result} />
            </li>
        {/each}
        {#if showWireFrame}
            {#each { length: 10 } as index}
                <li class=" m-2">
                    <TrackEntry />
                </li>
                <div use:intersect onintersect={onIntersect}></div>
            {/each}
        {/if}
    </ul>
{/await}
