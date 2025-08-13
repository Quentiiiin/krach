import { getTrackInfo } from '$lib/remote/sc.remote';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    return { result: getTrackInfo({ permalink_url: `/${params.user}/${params.track}` }) };
}) satisfies PageLoad;