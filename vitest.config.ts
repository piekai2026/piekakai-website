import { defineConfig } from "vitest/config";

// Monorepo test runner. Each app/package with tests is picked up as a project.
export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
  },
});
