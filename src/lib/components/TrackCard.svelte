<script lang="ts">
    import type { SoundcloudTrack } from "soundcloud.ts-light";
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
<button
    onclick={() => {
        if (track) audioPlayer.play(track);
    }}
    class=""
>
    <Thumbnail
        classNames="h-20 w-20 transition-all duration-100 {isPlaying
            ? 'border-2 border-pink-400 animate-pulse'
            : ''}"
        src={track?.artwork_url}
    />
</button>
