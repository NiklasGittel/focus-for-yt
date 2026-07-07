// utils/messaging.ts
import { defineExtensionMessaging } from "@webext-core/messaging";
import { PAUSE_STRICT_MODE_MESSAGE } from "./messaging.constants";


interface Protocol {
  [PAUSE_STRICT_MODE_MESSAGE]: (duration: number) => void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<Protocol>();