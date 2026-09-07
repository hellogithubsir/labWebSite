import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  outputDir: ".next/playwright-results",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "npm run build && npm run start -- --hostname 127.0.0.1 --port 3000",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
