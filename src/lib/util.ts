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
        const fullArtwork = getArtworkSizes(newArtworkUrl).full;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: newTitle,
            artist: newArtist,
            artwork: [
                {
                    src: fullArtwork,
                    sizes: "1080x1080", // Specify a general size or provide multiple
                    type: "image/png", // Or 'image/jpeg' etc.
                },
            ],
        });
    }
}

export function isPWA(): boolean {
    // For iOS Safari
    const isIOSStandalone = (window.navigator as any).standalone === true;

    // For most browsers (Chrome, Edge, etc.)
    const isDisplayStandalone =
        window.matchMedia('(display-mode: standalone)').matches;



    return isIOSStandalone || isDisplayStandalone;
}

export function getArtworkSizes(url: string) {
    const path = new URL(url).pathname;
    const file = path.split('.')[0];
    const fileSplitted = file.split('-');
    fileSplitted.pop();
    let newFilePrefix = '';
    fileSplitted.forEach(p => newFilePrefix = newFilePrefix + p + '-');
    const resultUrl = new URL(url);
    resultUrl.pathname = newFilePrefix;
    const s = resultUrl.toString();
    const sizes = {
        full: s + 't1080x1080.jpg',
        medium: s + 't500x500.jpg',
        small: s + 't50x50.jpg'
    };
    return sizes;
}