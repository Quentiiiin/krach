import { getTrackInfo } from '$lib/remote/sc.remote';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    return { result: getTrackInfo({ user: params.user, track: params.track }) };
}) satisfies PageLoad;