import path from "node:path";
import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

// The Worker's own suite, run inside workerd against local D1 and R2. The shared core's suite runs
// under Node in vitest.config.ts.
export default defineConfig(async () => {
	const migrations = await readD1Migrations(path.join(import.meta.dirname, "drizzle"));
	return {
		plugins: [
			cloudflareTest({
				wrangler: { configPath: "./wrangler.jsonc" },
				miniflare: {
					bindings: {
						TEST_MIGRATIONS: migrations,
						ACCOUNT_KEY: "test-only-account-key-not-a-real-secret",
					},
				},
			}),
		],
		test: {
			include: ["src/worker/**/*.test.ts"],
			setupFiles: ["./src/worker/setup.ts"],
			// CI runs about five times slower than a Mac: 150 signed posts in a row take under 2s here
			// and ran past the 5s default there, which stopped a release.
			testTimeout: 20_000,
			hookTimeout: 20_000,
		},
	};
});
