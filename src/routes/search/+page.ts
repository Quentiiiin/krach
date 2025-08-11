import { getSearchResults } from '$lib/remote/sc.remote';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
    let searchQuery = new URL(url).searchParams.get("q") ?? "";
    return { results: getSearchResults({ term: searchQuery }), term: searchQuery };
}) satisfies PageLoad;