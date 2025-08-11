<script lang="ts">
    import { audioPlayer } from "$lib/state/player.svelte";
    import type { SoundcloudTrack } from "soundcloud.ts";

    const { track }: { track?: SoundcloudTrack } = $props();

    const icon: "play" | "pause" = $derived.by(() => {
        if (
            audioPlayer.paused ||
            (track &&
                audioPlayer.currentTrack?.permalink_url !== track.permalink_url)
        ) {
            return "play";
        }
        return "pause";
    });
</script>

<button
    class=" bg-orange-600 text-2xl"
    onclick={() => {
        if (
            track &&
            audioPlayer.currentTrack?.permalink_url !== track.permalink_url
        ) {
            audioPlayer.currentTime = 0;
            audioPlayer.currentTrack = track;
            audioPlayer.paused = false;
        } else if (audioPlayer.currentTrack) {
            audioPlayer.paused = !audioPlayer.paused;
        }
    }}
>
    {#if icon === "play"}
        play
    {:else}
        pause
    {/if}
</button>
