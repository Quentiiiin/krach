// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SoundcloudTrack, SoundcloudUser } from "soundcloud.ts";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			scKey: string,
			oAuth?: string
		}
		interface PageData {
			me?: SoundcloudUser,
			meLikes?: SoundcloudTrack[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
