export enum UsageLimitType {
    TimeBased = 0,
    VideoBased = 1,
}
export interface DailyVideoCount {
    date: string; // ISO date string 
    count: number;
    videoIds: string[]; 
}
export interface DailyWatchtime {
    date: string; // ISO date string 
    watchTimeInMs: number;
}