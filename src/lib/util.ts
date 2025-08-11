export function formatSecondsToMMSS(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

export function updateMediaSessionMetadata(
    newTitle: string,
    newArtist: string,
    newArtworkUrl: string,
) {
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: newTitle,
            artist: newArtist,
            album: "Web Dev Jams", // Keep or update album
            artwork: [
                {
                    src: newArtworkUrl,
                    sizes: "512x512", // Specify a general size or provide multiple
                    type: "image/png", // Or 'image/jpeg' etc.
                },
            ],
        });
    }
}