const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/check-all");
});

test("Every checkboxes should be checked", async ({ page }) => {
  await page.getByLabel("Check all").first().check();
  await expect(page.getByLabel("Checkbox 1")).toBeChecked();
  await expect(page.getByLabel("Checkbox 2")).toBeChecked();
  await expect(page.getByLabel("Check all").nth(0)).toBeChecked();
  await expect(page.getByLabel("Check all").nth(1)).toBeChecked();
});

test("Every checkboxes should be unchecked", async ({ page }) => {
  await page.getByLabel("Check all").nth(0).check();
  await page.getByLabel("Check all").nth(0).uncheck();
  await expect(page.getByLabel("Checkbox 1")).not.toBeChecked();
  await expect(page.getByLabel("Checkbox 2")).not.toBeChecked();
  await expect(page.getByLabel("Check all").nth(0)).not.toBeChecked();
  await expect(page.getByLabel("Check all").nth(1)).not.toBeChecked();
});

test("Check all should be unchecked since all checkboxes are unchecked", async ({
  page,
}) => {
  await page.getByLabel("Checkbox 1").check();
  await expect(page.getByLabel("Check all").nth(0)).not.toBeChecked();
  await expect(page.getByLabel("Check all").nth(1)).not.toBeChecked();
});

test("Check all should be indeterminate since some checkboxes are checked", async ({
  page,
}) => {
  await page.getByLabel("Checkbox 1").check();
  expect(
    await page
      .getByLabel("Check all")
      .nth(0)
      .evaluate((node) => node.indeterminate)
  ).toBe(true);
  expect(
    await page
      .getByLabel("Check all")
      .nth(1)
      .evaluate((node) => node.indeterminate)
  ).toBe(true);
});

test("Check all should be checked since all checkboxes are checked", async ({
  page,
}) => {
  await page.getByLabel("Checkbox 1").check();
  await page.getByLabel("Checkbox 2").check();
  await expect(page.getByLabel("Check all").nth(0)).toBeChecked();
  await expect(page.getByLabel("Check all").nth(1)).toBeChecked();
});
