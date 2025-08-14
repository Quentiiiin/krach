<script lang="ts">
    import { da } from "zod/locales";
    import type { LayoutProps } from "./$types";

    let { data, children }: LayoutProps = $props();
</script>

<div class=" fixed top-0 h-36 w-screen z-10">
    <div class=" w-screen h-38 bg-[#efaeff] pt-16 border-b-2 border-black">
        <div class=" text-3xl font-bold flex h-10">
            {#await data.user then user}
                <img
                    src={user.avatar_url}
                    class=" rounded-full h-20 border-2 border-black"
                    alt=""
                />
                {user.username}
            {/await}
        </div>
        <div class=" pl-22">
            <a href="/u/{data.userSlug}">overview</a>
            <a href="/u/{data.userSlug}/likes">likes</a>
        </div>
    </div>
</div>
<div class=" mt-40">
    {@render children()}
</div>
