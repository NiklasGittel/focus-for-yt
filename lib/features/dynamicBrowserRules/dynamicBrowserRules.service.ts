import { DynamicRule } from "./dynamicBrowserRules.types";

export async function enableRule(rule: DynamicRule) {
    if (!browser.declarativeNetRequest) {
        console.log("Declarative Net Request API not available. Cannot enable rule.");
        return;
    }
    console.log("Enabling rule with ID:", rule.id);
    await browser.declarativeNetRequest.updateDynamicRules({
        addRules: [rule],
        removeRuleIds: [rule.id] // Prevent duplicate rules
    });
}

export async function disableRule(rule: DynamicRule) {
    if (!browser.declarativeNetRequest) {
        console.log("Declarative Net Request API not available. Cannot disable rule.");
        return;
    }
    console.log("Disabling rule with ID:", rule.id);
    await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [rule.id]
    });
}

export async function toggleRule(rule: DynamicRule, enable: boolean) {
    if (enable) {
        await enableRule(rule);
    } else {
        await disableRule(rule);
    }
}
