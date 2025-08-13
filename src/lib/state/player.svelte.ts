import { updateMediaSessionMetadata } from "$lib/util";
import type { SoundcloudTrack } from "soundcloud.ts";
import { tick } from "svelte";

export class AudioPlayer {
    currentTrack?: SoundcloudTrack = $state();
    nextPlaybackTracks: SoundcloudTrack[] = $state([]);
    currentTime = $state(0);
    paused = $state(true);
    audioElement?: HTMLAudioElement = $state();
    volume = $state(0.2);
    loop = $state(false);

    loadFromStorage() {
        try {
            const data = localStorage.getItem('krach-player-data');
            if (!data) return;
            const parsed: {
                currentTrack?: SoundcloudTrack,
                nextPlaybackTracks: SoundcloudTrack[],
                volume: number,
                loop: boolean,
                currentTime: number
            } = JSON.parse(data);
            this.currentTrack = parsed.currentTrack;
            this.nextPlaybackTracks = parsed.nextPlaybackTracks;
            this.volume = parsed.volume;
            this.loop = parsed.loop;
            this.currentTime = parsed.currentTime;
        } catch (error) {
            console.error("saved playback data invalid, deleting");
            localStorage.removeItem('krach-player-data');
        }
    }

    saveToStorage() {
        localStorage.setItem('krach-player-data', JSON.stringify({
            currentTrack: this.currentTrack,
            nextPlaybackTracks: this.nextPlaybackTracks,
            volume: this.volume,
            loop: this.loop,
            currentTime: this.currentTime
        }));
    }

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
        this.saveToStorage();
    }
    addToQueue(track: SoundcloudTrack) {
        this.nextPlaybackTracks = [...this.nextPlaybackTracks, track];
        this.saveToStorage();
    }
    handleEnded() {
        if (this.loop) {
            this.currentTime = 0;
            this.paused = false;
        } else {
            this.nextTrack();
        }
        this.saveToStorage();
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
        this.saveToStorage();
    }
}

export const audioPlayer = new AudioPlayer();