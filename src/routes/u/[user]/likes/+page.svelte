<script lang="ts">
    import TrackEntry from "$lib/components/TrackEntry.svelte";

    let { data } = $props();
</script>

{#await data.likes}
    {#each { length: 10 } as index}
        <li class=" m-2">
            <TrackEntry />
        </li>
    {/each}
{:then likes}
    <ul class="">
        {#each likes as like, index}
            <li class="m-2">
                <TrackEntry track={like} />
            </li>
        {/each}
    </ul>
{/await}
