import { getClient } from '$lib/server/sc-util';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const { url } = await getClient().util.getTrackStreamUrl(`https://soundcloud.com/${params.user}/${params.track}`);
    const res = fetch(url);
    return res;
};