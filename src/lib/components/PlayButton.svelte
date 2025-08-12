<script lang="ts">
    import { audioPlayer } from "$lib/state/player.svelte";
    import { PauseIcon, PlayIcon } from "lucide-svelte";
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
    class=" bg-purple-300 nb-button w-10 h-10 flex items-center justify-center cursor-pointer"
    onclick={() => {
        if (
            track &&
            audioPlayer.currentTrack?.permalink_url !== track.permalink_url
        ) {
            audioPlayer.play(track);
        } else if (audioPlayer.currentTrack) {
            audioPlayer.paused = !audioPlayer.paused;
        }
    }}
>
    {#if icon === "play"}
        <PlayIcon size="30" />
    {:else}
        <PauseIcon size="30" />
    {/if}
</button>
