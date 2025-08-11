<script lang="ts">
    import { audioPlayer } from "$lib/state/player.svelte";
</script>

{#key audioPlayer.currentTrack?.permalink_url}
    {#if audioPlayer.currentTrack}
        <audio
            onended={() => audioPlayer.handleEnded()}
            bind:currentTime={audioPlayer.currentTime}
            bind:this={audioPlayer.audioElement}
            bind:paused={audioPlayer.paused}
            bind:volume={audioPlayer.volume}
            src="/u{audioPlayer.currentTrack?.permalink_url}/audio.mp3"
        ></audio>
    {/if}
{/key}
