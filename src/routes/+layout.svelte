<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { goto } from "$app/navigation";
	import AudioWrapper from "$lib/components/AudioWrapper.svelte";
	import { audioPlayer } from "$lib/state/player.svelte";
	import PlayButton from "$lib/components/PlayButton.svelte";
	import { formatSecondsToMMSS } from "$lib/util";
	import Thumbnail from "$lib/components/Thumbnail.svelte";
	import { page } from "$app/state";

	let { children } = $props();

	let searchValue = $state(new URL(page.url).searchParams.get("q") ?? "");
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class=" flex top-0 bg-amber-200 w-full h-10 items-center fixed z-10">
	<a href="/queue"> q </a>
	<form
		onsubmit={(event) => {
			event.preventDefault();
			goto("/search?q=" + searchValue);
		}}
	>
		<input
			name="q"
			bind:value={searchValue}
			type="text"
			placeholder="query"
		/>
	</form>
	current: {audioPlayer.currentTrack?.title}
	<PlayButton />
	<input
		type="range"
		min="0"
		max="1"
		bind:value={audioPlayer.volume}
		step="0.01"
	/>
	{Math.floor(audioPlayer.volume * 100)}%
	<Thumbnail
		classNames=" h-10 w-10"
		src={audioPlayer.currentTrack?.artwork_url}
	/>
	{formatSecondsToMMSS(audioPlayer.currentTime)}/{formatSecondsToMMSS(
		(audioPlayer.currentTrack?.full_duration ?? 0) / 1000,
	)}
	<input
		type="range"
		min="0"
		max={(audioPlayer.currentTrack?.full_duration ?? 0) / 1000}
		bind:value={audioPlayer.currentTime}
		step="0.1"
	/>
	next: {audioPlayer.nextPlaybackTracks.length}
</div>
<AudioWrapper />
<div class=" mt-12">
	{@render children?.()}
</div>
