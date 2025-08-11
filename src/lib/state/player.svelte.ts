import { updateMediaSessionMetadata } from "$lib/util";
import type { SoundcloudTrack } from "soundcloud.ts";

export class AudioPlayer {
    currentTrack?: SoundcloudTrack = $state();
    nextPlaybackTracks: SoundcloudTrack[] = $state([]);
    currentTime = $state(0);
    paused = $state(true);
    audioElement?: HTMLAudioElement = $state();
    volume = $state(0.2);
    loop = $state(false);

    constructor() {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                console.log("next")
                this.nextTrack();
            });
        }
    }

    reset() {
        this.currentTrack = undefined;
        this.currentTime = 0;
        this.paused = true;
        this.audioElement = undefined;
        this.nextPlaybackTracks = [];
    }
    addToQueue(track: SoundcloudTrack) {
        this.nextPlaybackTracks = [...this.nextPlaybackTracks, track];
    }
    handleEnded() {
        if (this.loop) {
            this.currentTime = 0;
            this.paused = false;
        } else {
            this.nextTrack();
        }
    }
    nextTrack() {
        if (
            audioPlayer.nextPlaybackTracks.length > 0
        ) {
            const [firstElement, ...restOfTheArray] =
                this.nextPlaybackTracks;
            this.play(firstElement);
            audioPlayer.nextPlaybackTracks = restOfTheArray;
        } else {
            this.paused = true;
        }
    }
    play(track: SoundcloudTrack) {
        this.currentTime = 0;
        this.currentTrack = track;
        this.paused = false;
        updateMediaSessionMetadata(track.title, track.user.username, track.artwork_url);
    }
}

export const audioPlayer = new AudioPlayer();