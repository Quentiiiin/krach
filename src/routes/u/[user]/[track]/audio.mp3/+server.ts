import { getAudio, streamToArrayBuffer } from '$lib/server/sc-util';
import type { RequestHandler } from './$types';
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
    runtime: 'nodejs22.x'
};

export const GET: RequestHandler = async ({ params }) => {
    const stream = await getAudio(params.user, params.track);
    const arrayBuffer = await streamToArrayBuffer(stream);
    return new Response(arrayBuffer, {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': arrayBuffer.byteLength.toString(),
            'Cache-Control': 'public, max-age=604800'
        }
    });
};