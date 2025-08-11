<script lang="ts">
    import type { SoundcloudTrack } from "soundcloud.ts";
    import Thumbnail from "./Thumbnail.svelte";
    import { audioPlayer } from "$lib/state/player.svelte";

    const { track }: { track: SoundcloudTrack } = $props();
</script>

<div class=" flex hover:brightness-110 bg-purple-300 rounded-md p-1 w-dvh">
    <button
        onclick={() => {
            audioPlayer.play(track);
        }}
    >
        <Thumbnail classNames=" h-16 w-16" src={track.artwork_url} />
    </button>
    <div class=" pl-2 flex flex-col items-baseline">
        <div class=" font-bold">
            {track.title}
        </div>
        <div class=" text-zinc-600">
            {track.user.username}
        </div>
    </div>
    <button onclick={() => audioPlayer.addToQueue(track)} class="bg-red-200">
        next
    </button>
</div>
