import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// node by default; DOM tests opt in per-file with `@vitest-environment
// jsdom` (convention: `*.dom.test.ts`).
export default defineConfig({
	resolve: {
		alias: {
			"@core": resolve(import.meta.dirname, "../../packages/core/src"),
		},
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
		// CI runs about five times slower than a Mac, which put tests that take under a second here
		// (one loads the whole background, one writes megabytes to IndexedDB) past the 5s default
		// and stopped a release. As in clients/desktop/vitest.config.ts.
		testTimeout: 20_000,
		hookTimeout: 20_000,
		// Resets the detection helpers' shadow-DOM memo between cases; see the file.
		setupFiles: ["src/test/setup-dom.ts"],
		// jsdom loads no external resources and runs no scripts by default, so
		// site fixtures (e.g. reddit-login.html, which references redditstatic CSS
		// and recaptcha JS) parse to DOM structure without any network access.
		// Tests only assert on structure, which is exactly what these defaults give.
		environmentOptions: {
			jsdom: {
				url: "https://example.com/",
			},
		},
	},
});
