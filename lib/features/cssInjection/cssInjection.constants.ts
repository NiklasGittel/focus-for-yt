const prefix = 'focus-for-yt-';

export const HIDE_POSTS_CSS_STYLE_ID = `${prefix}hide-posts-section-style`;
export const HIDE_POSTS_CSS = `
    ytd-shelf-renderer:has(ytd-post-renderer),
    ytd-rich-shelf-renderer:has(ytd-post-renderer),
    yt-tab-shape[tab-title="Posts"],
    ytd-rich-section-renderer:has(ytd-rich-item-renderer[is-post]) {
        display: none !important;
    } 
`;

export const HIDE_SHORTS_CSS_STYLE_ID = `${prefix}hide-shorts-style`;
export const HIDE_SHORTS_CSS = `
    yt-tab-shape[tab-title="Shorts"],
    ytd-rich-grid-renderer[is-shorts-grid],
    yt-horizontal-list-renderer:has(ytm-shorts-lockup-view-model),
    yt-horizontal-list-renderer:has(ytm-shorts-lockup-view-model-v2),
    ytm-shorts-lockup-view-model-v2,
    ytm-shorts-lockup-view-model,
    ytd-reel-shelf-renderer,
    grid-shelf-view-model:has(ytm-shorts-lockup-view-model),
    grid-shelf-view-model:has(ytm-shorts-lockup-view-model-v2),
    ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]),
    ytd-rich-shelf-renderer[is-shorts] {
        display: none !important;
    }
`;

export const HIDE_RECOMMENDATIONS_CSS_STYLE_ID = `${prefix}hide-recommendations-style`;
export const HIDE_RECOMMENDATIONS_CSS = `
  #secondary,
  ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,
  div.ytd-watch-flexy#related
  {
    display: none !important;
  }
`;

export const HIDE_DRAWER_CSS_STYLE_ID = `${prefix}hide-drawer-style`;
export const HIDE_DRAWER_CSS = `
    yt-icon-button#guide-button,
    ytd-mini-guide-renderer,
    tp-yt-app-drawer{
        display: none !important;
    }
`;

export const HIDE_COMMENTS_CSS_STYLE_ID = `${prefix}hide-comments-style`;
export const HIDE_COMMENTS_CSS = `
  #comments {
    display: none !important;
  }
`;

export const HIDE_AUTOPLAY_CSS_STYLE_ID = `${prefix}hide-autoplay-style`;
export const HIDE_AUTOPLAY_CSS = `
  ytd-player .ytp-fullscreen-grid[aria-label="Hide videos"]  {
    display: none !important;
  }

  .ytp-ce-element{
    display: none !important;
  }
`;


