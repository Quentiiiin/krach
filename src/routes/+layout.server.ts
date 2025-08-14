import { getLikes, me } from '$lib/remote/sc.remote';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const isAuthed = cookies.get('scOAuth') !== undefined;
    const meData = isAuthed ? await me() : null
    return {
        isAuthed,
        me: meData,
        meLikes: meData ? await getLikes({ userResolvable: `${meData.id}` }) : null
    };
}) satisfies LayoutServerLoad;