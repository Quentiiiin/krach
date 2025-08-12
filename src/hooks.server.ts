import type { Handle } from '@sveltejs/kit';
import { Soundcloud } from 'soundcloud.ts';

export const handle: Handle = async ({ event, resolve }) => {
    let scKey = event.cookies.get("scKey");
    if (!scKey) {
        const newKey = await new Soundcloud().api.getClientId();
        event.cookies.set("scKey", newKey, { path: '/' });
        scKey = newKey;
    }
    event.locals.scKey = scKey;
    const response = await resolve(event);
    return response;
};