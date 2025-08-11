import { query } from "$app/server";
import z from "zod";
import { getClient } from "$lib/server/sc-util";
import type { SoundcloudTrack } from "soundcloud.ts";

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
    user: z.string(),
    track: z.string()
}), async ({ user, track }) => {
    const client = getClient();
    const res = await client.tracks.get(`https://soundcloud.com/${user}/${track}`)
    rewritePermalink(res);
    return res;
});

function rewritePermalink(track: SoundcloudTrack) {
    const url = new URL(track.permalink_url);
    track.permalink_url = url.pathname;
}