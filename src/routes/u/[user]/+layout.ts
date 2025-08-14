import { getUser } from '$lib/remote/sc.remote';
import type { LayoutLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        user: getUser({ userResolvable: params.user }), userSlug: params.user
    };
}) satisfies LayoutLoad;