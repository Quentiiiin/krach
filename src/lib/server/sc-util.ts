import { getRequestEvent } from "$app/server";
import { Soundcloud } from "soundcloud.ts";

export function getClient() {
    const event = getRequestEvent();
    const scKey = event.locals.scKey;
    return new Soundcloud(scKey);
}

export async function getAudio(user: string, track: string) {
    const client = getClient();
    const stream = await client.util.streamTrack(`https://soundcloud.com/${user}/${track}`);
    return stream;
}



export async function streamToArrayBuffer(
    stream: NodeJS.ReadableStream
): Promise<ArrayBuffer> {
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) =>
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        );
        stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            // Safe conversion to ArrayBuffer
            const arrayBuffer = buffer instanceof Buffer
                ? Uint8Array.from(buffer).buffer
                : new Uint8Array(buffer).buffer;
            resolve(arrayBuffer);
        });
        stream.on('error', reject);
    });
}