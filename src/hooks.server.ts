import type { Handle } from '@sveltejs/kit';
import scScraper from 'soundcloud-scraper';

export const handle: Handle = async ({ event, resolve }) => {
    let scKey = event.cookies.get("scKey");
    if (!scKey) {
        const newKey = await scScraper.Util.keygen();
        event.cookies.set("scKey", newKey, { path: '/' });
        scKey = newKey;
    }
    event.locals.scKey = scKey;
    const response = await resolve(event);
    return response;
};