import { getRequestEvent } from "$app/server";
import { Soundcloud } from "soundcloud.ts-light";

export function getClient(authenticated: boolean = false) {
    const event = getRequestEvent();
    const scKey = event.locals.scKey;
    const oAuth = authenticated ? event.locals.oAuth : undefined;
    return new Soundcloud(scKey, oAuth);
}