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

<div class=" flex top-0 bg-amber-200 w-full h-10 items-center fixed z-10">
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
</div>
<AudioWrapper />
<div class=" mt-12">
	{@render children?.()}
</div>
<PlayerBar />
