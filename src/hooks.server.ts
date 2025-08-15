import type { Handle } from '@sveltejs/kit';
import { Soundcloud } from 'soundcloud.ts-light';

export const handle: Handle = async ({ event, resolve }) => {
    let scKey = event.cookies.get("scKey");
    let scOAuth = event.cookies.get("scOAuth");
    if (!scKey) {
        const newKey = await new Soundcloud().api.getClientId();
        event.cookies.set("scKey", newKey, { path: '/' });
        scKey = newKey;
    }
    event.locals.scKey = scKey;
    event.locals.oAuth = scOAuth;
    const response = await resolve(event);
    return response;
};