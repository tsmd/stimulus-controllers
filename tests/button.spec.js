const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/button");
});

test("role attribute should be set", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Click me" })).toBeTruthy();
});

test("tabindex attribute should be set", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Click me" })).toHaveAttribute(
    "tabindex",
    "0"
  );
});

test("should be clickable via click", async ({ page }) => {
  await page.getByRole("button", { name: "Click me" }).click();
  await expect(page.locator("output")).toHaveText("clicked");
});

test("should be clickable via space key", async ({ page }) => {
  await page.getByRole("button", { name: "Click me" }).type(" ");
  await expect(page.locator("output")).toHaveText("clicked");
});

test("should be clickable via enter key", async ({ page }) => {
  await page.getByRole("button", { name: "Click me" }).press("Enter");
  await expect(page.locator("output")).toHaveText("clicked");
});

test("should be clickable with shift keys", async ({ page }) => {
  await page.getByRole("button", { name: "Click me" }).press("Shift+Enter");
  await expect(page.locator("output")).toHaveText("clicked (shift)");
});
