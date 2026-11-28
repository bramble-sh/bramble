// The home page's hero announces the mailbox with a link to its post. The letter shows only while
// the post is published, so a renamed post would hide it without an error. Dev builds publish
// every post, which is what this checks against.

import { expect, test } from "@playwright/test";

test("the hero announces the mailbox and opens its post", async ({ page }) => {
	await page.goto("/");
	const letter = page.getByRole("link", { name: /Bramble Mailbox ?: Sync like the cloud/ });
	await expect(letter).toBeVisible();
	await letter.click();
	await expect(page).toHaveURL(/\/blog\/the-mailbox$/);
	await expect(page.getByRole("heading", { level: 1 })).toContainText("The mailbox");
});
