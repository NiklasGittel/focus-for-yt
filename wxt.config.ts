import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';
import tsconfigPaths from 'vite-tsconfig-paths';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: "Focus for YouTube™",
    permissions: ["declarativeNetRequest", "storage"],
    host_permissions: ["*://*.youtube.com/*"],
    declarative_net_request: {
      rule_resources: [
        {
          id: "ruleset_1",
          enabled: true,
          path: "rules.json" // Maps to public/rules.json
        }
      ]
    }
  },
  vite: () => ({
    plugins: [tailwindcss(), tsconfigPaths()],
  }),
});
