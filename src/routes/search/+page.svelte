<script lang="ts">
    import PlayButton from "$lib/components/PlayButton.svelte";
    import TrackEntry from "$lib/components/TrackEntry.svelte";
    import { getSearchResults } from "$lib/remote/sc.remote.js";

    const { data } = $props();

    /*
    await getSearchResults({
        term: data.term,
        offset: (await data.results).length,
    });
    */
</script>

{#await data.results}
    loading...
{:then results}
    <ul>
        {#each results as result}
            <li class="m-2">
                <TrackEntry track={result} />
            </li>
        {/each}
    </ul>
{/await}
