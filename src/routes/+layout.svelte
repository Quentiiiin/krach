<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { goto } from "$app/navigation";
	import AudioWrapper from "$lib/components/AudioWrapper.svelte";
	import { page } from "$app/state";
	import "@fontsource-variable/dm-sans";
	import PlayerBar from "$lib/components/PlayerBar.svelte";

	let { children } = $props();

	let searchValue = $state(new URL(page.url).searchParams.get("q") ?? "");
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class=" flex top-0 bg-purple-400 w-full items-center fixed z-10 border-b-2 border-black md:text-3xl"
>
	<form
		onsubmit={(event) => {
			event.preventDefault();
			goto("/search?q=" + searchValue);
		}}
	>
		<input
			class=" outline-0 m-1 w-screen"
			name="q"
			bind:value={searchValue}
			type="text"
			placeholder="search a song"
		/>
	</form>
</div>
<AudioWrapper />
<div class=" mt-14">
	{@render children?.()}
</div>
<PlayerBar />
