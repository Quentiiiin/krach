import { getLikes } from '$lib/remote/sc.remote';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const username = params.user;
    return {
        likes: getLikes({ userResolvable: username })
    };
}) satisfies PageLoad;