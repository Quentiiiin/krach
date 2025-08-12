<script lang="ts">
    import type { SoundcloudTrack } from "soundcloud.ts";
    import Thumbnail from "./Thumbnail.svelte";
    import { audioPlayer } from "$lib/state/player.svelte";
    import { ListPlus } from "lucide-svelte";

    const { track }: { track?: SoundcloudTrack } = $props();

    const randomWidth = () => `${Math.floor(Math.random() * 12) + 5}rem`;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_missing_attribute -->
<a
    onclick={() => {
        if (track) audioPlayer.play(track);
    }}
    class=" text-medium md:text-2xl flex justify-between hover:brightness-110 bg-purple-300 rounded-md p-1 nb-border"
>
    <div class=" flex">
        <Thumbnail classNames=" h-16 w-16" src={track?.artwork_url} />
        <div class=" pl-2 flex flex-col items-baseline">
            <div class=" font-bold">
                {#if track}
                    {track.title}
                {:else}
                    <span
                        style="width: {randomWidth()};"
                        class=" h-6 bg-purple-200 flex animate-pulse rounded-md"
                    ></span>
                {/if}
            </div>
            <div class=" text-zinc-600">
                {#if track}
                    {track.user.username}
                {:else}
                    <span
                        style="width: {randomWidth()};"
                        class=" h-6 mt-1 bg-purple-100 flex animate-pulse rounded-md"
                    ></span>
                {/if}
            </div>
        </div>
    </div>
    <div class=" mr-2 flex items-center pb-2">
        <button
            onclick={(event) => {
                event.stopPropagation();
                if (track) audioPlayer.addToQueue(track);
            }}
            class=" nb-button bg-pink-400 w-10 h-10 flex items-center justify-center"
        >
            <ListPlus />
        </button>
    </div>
</a>
