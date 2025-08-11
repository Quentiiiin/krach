import type { SoundcloudTrack } from "soundcloud.ts";

export class AudioPlayer {
    currentTrack?: SoundcloudTrack = $state();
    nextPlaybackTracks: SoundcloudTrack[] = $state([]);
    currentTime = $state(0);
    paused = $state(true);
    audioElement?: HTMLAudioElement = $state();
    volume = $state(0.2);
    loop = $state(false);

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
        console.log(this.loop)
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
                audioPlayer.nextPlaybackTracks;
            audioPlayer.currentTime = 0;
            audioPlayer.currentTrack = firstElement;
            audioPlayer.paused = false;
            audioPlayer.nextPlaybackTracks = restOfTheArray;
        } else {
            this.paused = true;
        }
    }
}

export const audioPlayer = new AudioPlayer();