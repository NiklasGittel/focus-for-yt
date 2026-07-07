// utils/logger.ts

const PREFIX = '[MYT]';

const isDev = false;

export const logger = {
  info: isDev ? console.log.bind(window.console, `%c${PREFIX}`, 'color: #0ea5e9; font-weight: bold;') : () => {},
  
  warn: isDev ? console.warn.bind(window.console, `%c${PREFIX}`, 'color: #f59e0b; font-weight: bold;') : () => {},
  
  error: isDev ? console.error.bind(window.console, `%c${PREFIX}`, 'color: #ef4444; font-weight: bold;') : () => {},
};