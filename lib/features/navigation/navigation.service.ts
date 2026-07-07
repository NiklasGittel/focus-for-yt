import { blockShortsItem, blockYoutubeItem } from "@/lib/shared/services/storageService";
import { ABOUT_BLANK_URL, BLOCKED_URL, CHANNEL_URL_REGEX, HOME_PAGE_URL, HOMEPAGE_URL_REGEX, SHORTS_URL_REGEX, WATCH_URL_REGEX } from "./navigation.constants";

//MISC
const getDestinationUrlFromEvent = (event: Event): string | null => {
    return event instanceof CustomEvent && event.detail && typeof event.detail.destinationUrl === 'string' ? event.detail.destinationUrl : null;
};


//REDIRECTS
export function redirectToHomepage() {
    window.location.href = HOME_PAGE_URL;
}

export function redirectToBlank() {
    window.location.href = ABOUT_BLANK_URL;
}

export function redirectToBlocked() {
    window.location.href = BLOCKED_URL;
}


// IS X URL
export function isShortsUrl(url: string): boolean {
    return SHORTS_URL_REGEX.test(url);
}

export function isHomeUrl(url: string): boolean {
    return HOMEPAGE_URL_REGEX.test(url);
}

export function isWatchUrl(url: string): boolean {
    return WATCH_URL_REGEX.test(url);
}

export function isWatchUrlCurrent(): boolean {
    return isWatchUrl(window.location.href);
}

export function isChannelUrl(url: string): boolean {
    return CHANNEL_URL_REGEX.test(url);
}

export function isYoutubeUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.endsWith("youtube.com") || parsedUrl.hostname.endsWith("youtu.be");
    } catch (e) {
        console.error("Invalid URL:", url);
        return false;
    }
}


//CHECK AND REDIRECT
export async function checkAllAndRedirectAsync(event: Event) {
    await Promise.all([
        checkAndRedirectIfShortsAsync(event),
        checkAndRedirectIfYoutubeAsync(event)
    ]);
}

export async function checkAndRedirectIfShortsAsync(event: Event) {
    const blockShorts = await blockShortsItem.getValue();
    if (!blockShorts) return;

    const destinationUrl = getDestinationUrlFromEvent(event);
    const currentUrl = window.location.href;

    if (isShortsUrl(currentUrl) || (destinationUrl && isShortsUrl(destinationUrl))) redirectToHomepage();
}

export async function checkAndRedirectIfYoutubeAsync(event: Event) {
    const blockYoutube = await blockYoutubeItem.getValue();
    if (!blockYoutube) return;

    const destinationUrl = getDestinationUrlFromEvent(event);
    const currentUrl = window.location.href;

    if (isYoutubeUrl(currentUrl) || (destinationUrl && isYoutubeUrl(destinationUrl))) redirectToBlank();
}