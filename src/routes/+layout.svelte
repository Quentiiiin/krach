<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { goto } from "$app/navigation";
	import AudioWrapper from "$lib/components/AudioWrapper.svelte";
	import { page } from "$app/state";
	import "@fontsource-variable/dm-sans";
	import PlayerBar from "$lib/components/PlayerBar.svelte";
	import { onMount, tick } from "svelte";
	import { audioPlayer } from "$lib/state/player.svelte";

	let { children, data } = $props();

	let searchValue = $state(new URL(page.url).searchParams.get("q") ?? "");

	onMount(async () => {
		await tick();
		audioPlayer.loadFromStorage();
		setInterval(() => {
			audioPlayer.saveToStorage();
		}, 10 * 1000);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class=" flex justify-between top-0 bg-purple-400 w-full items-center fixed z-20 border-b-2 border-black md:text-3xl"
>
	<form
		class=" flex-1"
		onsubmit={(event) => {
			event.preventDefault();
			goto("/search?q=" + searchValue);
		}}
	>
		<input
			class=" outline-0 m-1 w-full"
			name="q"
			bind:value={searchValue}
			type="text"
			placeholder="search a song"
		/>
	</form>
	<div class=" flex items-center">
		{#if data.me}
			<a href="/u/{data.me.id}/likes">
				<img
					class=" rounded-full h-8"
					src={data.me.avatar_url}
					alt=""
				/>
			</a>
		{/if}
		<div class=" mx-2 font-black">krach</div>
	</div>
</div>
<AudioWrapper />
<div class=" mt-14">
	{@render children?.()}
</div>
<PlayerBar />
