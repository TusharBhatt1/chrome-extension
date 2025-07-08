import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    host_permissions: ['https://app.cal.com/*'],
    permissions: ['cookies'],
  },
});
