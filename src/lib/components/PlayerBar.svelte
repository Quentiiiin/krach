<script lang="ts">
    import { audioPlayer } from "$lib/state/player.svelte";
    import { formatSecondsToMMSS } from "$lib/util";
    import PlayButton from "./PlayButton.svelte";
    import Thumbnail from "./Thumbnail.svelte";

    const formattedCurrentTime = $derived(
        formatSecondsToMMSS(audioPlayer.currentTime),
    );
    const formattedTotalDuration = $derived(
        formatSecondsToMMSS(
            (audioPlayer.currentTrack?.full_duration ?? 0) / 1000,
        ),
    );
    const formattedVolume = $derived(
        `${Math.floor(audioPlayer.volume * 100)}%`,
    );
</script>

<div
    class="fixed z-10 bottom-4 left-1/2 -translate-x-1/2 bg-fuchsia-400 flex rounded-md border-2 border-black px-3 py-2 items-center space-x-4 scale-90 md:scale-100"
>
    <PlayButton />
    <div class="flex flex-col items-center">
        <span
            class=" mb-1 whitespace-nowrap text-base overflow-hidden text-ellipsis max-w-56"
        >
            {audioPlayer.currentTrack?.title ?? "No track playing"}
        </span>
        <input
            type="range"
            class="range-slider track-progress-slider w-full bg-white h-2 rounded-xl border border-black mb-2"
            min="0"
            max={(audioPlayer.currentTrack?.full_duration ?? 0) / 1000}
            bind:value={audioPlayer.currentTime}
            step="0.1"
            aria-label="Track Progress"
        />
        <div class="flex justify-between w-full text-xs text-gray-800">
            <span>{formattedCurrentTime}</span>
            <span>{formattedTotalDuration}</span>
        </div>
    </div>

    <Thumbnail
        classNames="h-16 w-16 flex-shrink-0 rounded-md"
        src={audioPlayer.currentTrack?.artwork_url}
    />
</div>

<style lang="postcss">
    @reference '$lib/../app.css'

    .range-slider {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;

        @apply border-2 border-black rounded-2xl;
    }

    .range-slider::-moz-range-thumb,
    .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        @apply h-3.5 w-3.5 rounded-full shadow-md border-2 border-black;
    }

    .range-slider::-webkit-slider-runnable-track {
        @apply h-2 rounded-lg;
    }

    .range-slider::-moz-range-track {
        @apply h-2 rounded-lg;
    }

    .range-slider::-ms-track {
        @apply h-2 rounded-lg;
        border-color: transparent;
        color: transparent;
    }

    .range-slider::-ms-fill-lower,
    .range-slider::-ms-fill-upper {
        background: transparent;
    }
</style>
