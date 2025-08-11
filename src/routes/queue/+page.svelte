<script lang="ts">
    import TrackEntry from "$lib/components/TrackEntry.svelte";
    import { audioPlayer } from "$lib/state/player.svelte";
</script>

<ul>
    {#if audioPlayer.currentTrack}
        <li class="m-2">
            <TrackEntry track={audioPlayer.currentTrack} />
        </li>
    {/if}
    {#if audioPlayer.nextPlaybackTracks.length > 0}
        {#each audioPlayer.nextPlaybackTracks as track}
            <li class=" m-2">
                <TrackEntry {track} />
            </li>
        {/each}
    {:else}
        no tracks in queue
    {/if}
</ul>
