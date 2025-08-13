export function mobileClick(
    node: HTMLElement,
    callback: (event: Event) => void
) {
    const handle = (event: Event) => {
        event.preventDefault();
        callback(event);
    };

    node.addEventListener("touchstart", handle, { passive: false });
    node.addEventListener("click", handle);

    return {
        destroy() {
            node.removeEventListener("touchstart", handle);
            node.removeEventListener("click", handle);
        },
    };
}