<script lang="ts">
    import PlayButton from "$lib/components/PlayButton.svelte";
    let { data } = $props();
</script>

{#await data.result}
    loading...
{:then result}
    {result.title}
    <PlayButton track={result} />
    <img src={result.artwork_url} alt="thumbnail" />
{/await}
