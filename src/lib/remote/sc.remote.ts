import { command, getRequestEvent, query } from "$app/server";
import z from "zod";
import { getClient } from "$lib/server/sc-util";
import type { SoundcloudTrack } from "soundcloud.ts-light";

export const getSearchResults = query(z.object({
    term: z.string(),
    offset: z.number().optional()
}), async ({ term, offset }) => {
    const client = getClient();
    const res = await client.tracks.search({ q: term, offset });
    res.collection.forEach(e => rewritePermalink(e))
    return res.collection;
});

export const getTrackInfo = query(z.object({
    permalink_url: z.string()
}), async ({ permalink_url }) => {
    const client = getClient();
    const res = await client.tracks.get(`https://soundcloud.com${permalink_url}`)
    rewritePermalink(res);
    return res;
});

export const authenticate = command(z.object({
    oAuth: z.string()
}), async ({ oAuth }) => {
    const client = getClient();
    client.api.oauthToken = oAuth;
    const res = await client.me.get();
    if (res.id) {
        getRequestEvent().cookies.set('scOAuth', oAuth, { path: '/', maxAge: 60 * 60 * 24 * 7 });
        return true;
    } return false;
});

export const me = query(async () => {
    const client = getClient(true);
    return await client.me.get();
});

export const getLikes = query(z.object({
    userResolvable: z.string(),
}), async ({ userResolvable }) => {
    const client = getClient();
    let res = await client.users.likes(userResolvable);
    res = res.filter(v => v != null);
    res.forEach(r => rewritePermalink(r));
    return res;
});

export const getUser = query(z.object({
    userResolvable: z.string(),
}), async ({ userResolvable }) => {
    const client = getClient();
    let res = await client.users.get(userResolvable);
    return res;
});

export const getRelated = query(z.object({
    track: z.string(),
}), async ({ track }) => {
    const client = getClient();
    let res = await client.tracks.related(track);
    res.forEach(r => rewritePermalink(r));
    return res;
});

export const getAllRelated = query(
    z.object({
        userResolvable: z.string(),
    }),
    async ({ userResolvable }) => {
        const client = getClient();

        // Get all liked tracks
        const likes = await client.users.likes(userResolvable);

        // Use a Map keyed by track ID to ensure uniqueness
        const relatedMap = new Map<number, SoundcloudTrack>();

        // Fetch related tracks for each liked track in parallel
        await Promise.all(
            likes.map(async (t) => {
                if (!t) return;
                const res = await client.tracks.related(t.id);
                res.forEach((r) => {
                    if (r && !relatedMap.has(r.id)) {
                        relatedMap.set(r.id, r);
                    }
                });
            })
        );
        const all = Array.from(relatedMap.values());
        all.forEach(a => rewritePermalink(a));
        return all;
    }
);
function rewritePermalink(track: SoundcloudTrack) {
    const url = new URL(track.permalink_url);
    track.permalink_url = url.pathname;
}