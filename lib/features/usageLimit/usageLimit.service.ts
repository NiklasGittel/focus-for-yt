import { isWatchUrlCurrent, redirectToBlocked } from "../navigation/navigation.service";
import { dailyVideoCountItem, dailyWatchtimeItem, totalWatchtimeItem, usageLimitExceededItem, usageLimitItem, usageLimitTypeItem, usageLimitValueItem } from "../../shared/services/storageService";

import { getDateTimestamp } from "@/lib/shared/utils/dateTimestamp";
import { BEFORE_UNLOAD_EVENT, ENDED_EVENT, PAUSE_EVENT, PLAY_EVENT, WAITING_EVENT } from "@/lib/shared/constants/events";
import { DailyVideoCount } from "./usageLimit.types";


export async function checkUsageLimitAsync() {
    if (!isWatchUrlCurrent()) return;

    if (await isLimitExceeded()) {
        alert("You have exceeded your usage limit configured with Focus for YouTube today. You will be redirected.");
        await usageLimitExceededItem.setValue(true);
        redirectToBlocked();
    }
}

export async function isLimitExceeded(): Promise<boolean> {
    const isActive = await usageLimitItem.getValue();
    if (!isActive) return false;

    const currentLimitType = await usageLimitTypeItem.getValue();
    const currentLimit = await usageLimitValueItem.getValue();
    const currentValue = currentLimitType === 0 ? await getCurrentWatchtime() : await getCurrentVideoCount();
    return currentValue > currentLimit;
}

async function getCurrentWatchtime(): Promise<number> {
    const currentWatchtimeInMs = await dailyWatchtimeItem.getValue();
    return currentWatchtimeInMs.watchTimeInMs / 1000 / 60; // Convert ms to minutes
}

async function getCurrentVideoCount(): Promise<number> {
    const currentVideoCount = await dailyVideoCountItem.getValue();
    return currentVideoCount.count;
}

export async function increaseVideoCountAsync() {
    console.log("Attempting to increase video count");
    const currentVideoCount = await dailyVideoCountItem.getValue();
    const today = getDateTimestamp();
    const isSameDay = currentVideoCount.date === today;
    console.log(`Checking if video count should be increased. Current date: ${today}, Count date: ${currentVideoCount.date}, Is same day: ${isSameDay}`);
    const videoId = getCurrentlyWatchedVideoId();
    const hasVideoBeenCountedToday = isSameDay && videoId && currentVideoCount.videoIds.includes(videoId);

    console.log(`Current video count for today (${today}): ${currentVideoCount.count}. Video ID: ${videoId}, Has been counted today: ${hasVideoBeenCountedToday}`);

    if (hasVideoBeenCountedToday) return;

    const newCount = isSameDay ? currentVideoCount.count + 1 : 1;
    const newVideoIds = videoId ? [...(isSameDay ? currentVideoCount.videoIds : []), videoId] : currentVideoCount.videoIds;

    console.log(`Updating daily video count: ${newCount} for date: ${today}`);

    const updatedVideoCount: DailyVideoCount = {
        date: today,
        count: newCount,
        videoIds: newVideoIds,
    };

    console.log(`Updated DailyVideoCount object:`, JSON.stringify(updatedVideoCount));

    await dailyVideoCountItem.setValue(updatedVideoCount);
}

const getCurrentlyWatchedVideoId = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('v');
}

let isPlaying = false;
let lastPlayTimestamp = 0;
let saveInterval: number | null = null;
let trackedVideoElement: HTMLVideoElement | null = null;

export function registerPlaytimeTracker() {
    const videoElement = document.querySelector('video');

    if (videoElement && !videoElement.dataset.wxtTimeTrackerAdded) {

        cleanupPlaytimeTracker(); //just in case clean up

        console.log("MYT: Registering Playtime Tracker");

        trackedVideoElement = videoElement;
        videoElement.addEventListener(PLAY_EVENT, handlePlay);

        videoElement.addEventListener(PAUSE_EVENT, handlePause);
        videoElement.addEventListener(WAITING_EVENT, handlePause);
        videoElement.addEventListener(ENDED_EVENT, handlePause);

        window.addEventListener(BEFORE_UNLOAD_EVENT, handlePause);

        videoElement.dataset.wxtTimeTrackerAdded = 'true';
        console.log("MYT: Playtime Tracker registered successfully");
    } else {
        console.log("MYT: Video element not found or playtime tracker already registered.");
    }
}

export function cleanupPlaytimeTracker() {
    console.log("MYT: Cleaning up Playtime Tracker resources");

    if (isPlaying) handlePause();

    if (saveInterval) {
        window.clearInterval(saveInterval);
        saveInterval = null;
    }

    if (trackedVideoElement) {
        trackedVideoElement.removeEventListener(PLAY_EVENT, handlePlay);
        trackedVideoElement.removeEventListener(PAUSE_EVENT, handlePause);
        trackedVideoElement.removeEventListener(WAITING_EVENT, handlePause);
        trackedVideoElement.removeEventListener(ENDED_EVENT, handlePause);

        delete trackedVideoElement.dataset.wxtTimeTrackerAdded;

        trackedVideoElement = null;
    }
    window.removeEventListener(BEFORE_UNLOAD_EVENT, handlePause);
}

function handlePlay() {
    if (!isPlaying) {
        isPlaying = true;
        lastPlayTimestamp = Date.now();
        console.log("Video started playing at", new Date(lastPlayTimestamp).toISOString());

        // Save the accumulated time every 30 seconds
        saveInterval = window.setInterval(savePlaytimeChunk, 30000);
    }
}

function handlePause() {
    if (isPlaying) {
        savePlaytimeChunk();
        isPlaying = false;

        if (saveInterval) {
            window.clearInterval(saveInterval);
            saveInterval = null;
        }
    }
}

async function savePlaytimeChunk() {
    if (isPlaying && lastPlayTimestamp > 0) {
        const now = Date.now();
        const deltaMs = now - lastPlayTimestamp;

        lastPlayTimestamp = now;

        const currentTotalMs = await totalWatchtimeItem.getValue();
        await totalWatchtimeItem.setValue(currentTotalMs + deltaMs);

        const currentDailyWatchtime = await dailyWatchtimeItem.getValue();
        const todayDate = getDateTimestamp();
        
        if (currentDailyWatchtime && currentDailyWatchtime.date === todayDate) {    
            const updatedWatchtime = currentDailyWatchtime.watchTimeInMs + deltaMs;
            dailyWatchtimeItem.setValue({ date: todayDate, watchTimeInMs: updatedWatchtime });
            console.log(`Updated today's daily watchtime: ${updatedWatchtime}ms`);
        } else {
            dailyWatchtimeItem.setValue({ date: todayDate, watchTimeInMs: deltaMs });
            console.log(`Created new daily watchtime record for today: ${deltaMs}ms`);
        }
    }
}