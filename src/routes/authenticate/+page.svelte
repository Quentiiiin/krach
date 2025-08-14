<script lang="ts">
    import { authenticate } from "$lib/remote/sc.remote";

    let token = $state("");
    let result: boolean | undefined = $state();
</script>

{result}

<form
    onsubmit={async (event) => {
        event.preventDefault();
        if (token.length > 8) {
            const res = await authenticate({ oAuth: token });
            result = res;
        }
    }}
>
    <input type="text" bind:value={token} placeholder="o auth token" />
</form>
