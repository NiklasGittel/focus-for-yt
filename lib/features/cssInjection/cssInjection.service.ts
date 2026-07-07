import { EMPTY_STRING } from "@/lib/shared/constants/misc";
import { HIDE_AUTOPLAY_CSS, HIDE_AUTOPLAY_CSS_STYLE_ID, HIDE_COMMENTS_CSS, HIDE_COMMENTS_CSS_STYLE_ID, HIDE_DRAWER_CSS, HIDE_DRAWER_CSS_STYLE_ID, HIDE_POSTS_CSS, HIDE_POSTS_CSS_STYLE_ID, HIDE_RECOMMENDATIONS_CSS, HIDE_RECOMMENDATIONS_CSS_STYLE_ID, HIDE_SHORTS_CSS, HIDE_SHORTS_CSS_STYLE_ID } from "./cssInjection.constants";
import { blockShortsItem, hideCommentsItem, hideDrawerItem, hidePostsItem, hideRecommendationsItem, stopAutoplayItem } from "@/lib/shared/services/storageService";
import { stopAutoplayAsync } from "@/lib/features/autoplay/autoplay.service";

export async function toggleAllCssAsync() {
    await toggleShortsAsync();
    await toggleRecommendationsAsync();
    await toggleCommentsAsync();
    await togglePostsAsync();
    await toggleDrawerAsync();
    await toggleAutoplayAsync();
}

export async function togglePostsAsync() {
    const shouldHide = await hidePostsItem.getValue();
    toggleStyleInHead(shouldHide, HIDE_POSTS_CSS, HIDE_POSTS_CSS_STYLE_ID);
}

export async function toggleCommentsAsync() {
    const shouldHide = await hideCommentsItem.getValue();
    toggleStyleInHead(shouldHide, HIDE_COMMENTS_CSS, HIDE_COMMENTS_CSS_STYLE_ID);
}

export const toggleDrawerAsync = async () => {
    const shouldHide = await hideDrawerItem.getValue();
    toggleStyleInHead(shouldHide, HIDE_DRAWER_CSS, HIDE_DRAWER_CSS_STYLE_ID);
}

export async function toggleRecommendationsAsync() {
  const shouldHide = await hideRecommendationsItem.getValue();
  toggleStyleInHead(shouldHide, HIDE_RECOMMENDATIONS_CSS, HIDE_RECOMMENDATIONS_CSS_STYLE_ID);
}

export async function toggleShortsAsync() {
    const blockShorts = await blockShortsItem.getValue();
    toggleStyleInHead(blockShorts, HIDE_SHORTS_CSS, HIDE_SHORTS_CSS_STYLE_ID);
}

export async function toggleAutoplayAsync() {
    const stopAutoplay = await stopAutoplayItem.getValue();
    toggleStyleInHead(stopAutoplay, HIDE_AUTOPLAY_CSS, HIDE_AUTOPLAY_CSS_STYLE_ID);
}

export function injectStyleIntoHead(styleContent: string, id: string): HTMLStyleElement | null {
    const existingStyle = document.getElementById(id);

    if (id === EMPTY_STRING) {
        console.log("Attempting to inject style with empty string as ID. This may lead to unexpected behavior.");
        return null;
    }

    if (existingStyle) {
        console.log(`Style with ID "${id}" already exists. Skipping injection.`);
        return existingStyle as HTMLStyleElement;
    }

    console.log(`Injecting style with ID "${id}" into head.`);
    const head = document.head;
    const style = document.createElement('style');
    style.textContent = styleContent;
    style.id = id;
    head.appendChild(style);

    return style;
}

export function toggleStyleInHead(shouldInject: boolean, styleContent: string, id: string): void {
    if (shouldInject) {
        injectStyleIntoHead(styleContent, id);
    } else {
        removeStyleFromHead(id);
    }
}

export function removeStyleFromHead(id: string): void {
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
        console.log(`Removing style with ID "${id}" from head.`);
        existingStyle.remove();
    }
}