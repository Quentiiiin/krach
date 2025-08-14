<script lang="ts">
    import type { SoundcloudTrack } from "soundcloud.ts";
    import Thumbnail from "./Thumbnail.svelte";
    import { audioPlayer } from "$lib/state/player.svelte";
    import { Check, Heart, ListPlus } from "lucide-svelte";
    import { mobileClick } from "$lib/actions/mobileClick";
    import { page } from "$app/state";

    const { track }: { track?: SoundcloudTrack } = $props();

    const randomWidth = () => `${Math.floor(Math.random() * 12) + 5}rem`;

    const isPlaying = $derived(
        track &&
            track.permalink_url === audioPlayer.currentTrack?.permalink_url,
    );

    let showNextSuccess = $state(false);

    function handleNextButton(event: Event) {
        event.stopPropagation();
        if (track) {
            audioPlayer.addToQueue(track);
            showNextSuccess = true;
            setTimeout(() => {
                showNextSuccess = false;
            }, 1.5 * 1000);
        }
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<a
    onclick={() => {
        if (track) audioPlayer.play(track);
    }}
    class=" text-sm md:text-xl lg:text-2xl flex justify-between hover:brightness-110 bg-purple-300 rounded-md p-1 nb-border"
>
    <div class="flex min-w-0">
        <Thumbnail
            classNames="h-16 w-16 flex-shrink-0 transition-all duration-100 {isPlaying
                ? 'border-2 border-pink-400 animate-pulse'
                : ''}"
            src={track?.artwork_url}
        />
        <div class="pl-2 flex flex-col min-w-0">
            <div class="font-bold truncate w-full flex items-center">
                {#if track}
                    {track.title}
                {:else}
                    <span
                        style="width: {randomWidth()};"
                        class="md:h-6 h-4 bg-purple-200 flex animate-pulse rounded-md"
                    ></span>
                {/if}
            </div>
            <div class="text-zinc-600 truncate w-full">
                {#if track}
                    {track.user.username}
                {:else}
                    <span
                        style="width: {randomWidth()};"
                        class="md:h-6 h-4 mt-1 bg-purple-100 flex animate-pulse rounded-md"
                    ></span>
                {/if}
            </div>
        </div>
    </div>
    <div class="mr-2 flex items-center pb-2 flex-shrink-0">
        {#if track && page.data.meLikes?.find((v) => v.id === track.id) != null}
            <span class=" text-black mr-4">
                <Heart fill={"oklch(80.8% 0.114 19.571)"} />
            </span>
        {/if}
        <button
            use:mobileClick={handleNextButton}
            onclick={handleNextButton}
            class="nb-button bg-pink-400 w-10 h-10 flex items-center justify-center"
        >
            {#if showNextSuccess}
                <Check />
            {:else}
                <ListPlus />
            {/if}
        </button>
    </div>
</a>
