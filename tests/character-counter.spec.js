const base = require("@playwright/test");
const { expect } = base;

class Page {
  constructor(page) {
    this.page = page;

    this.textarea = this.page.getByRole("textbox", { name: "Textarea" });
    this.output = this.page.locator('[data-character-counter-target="output"]');
  }

  async goto() {
    await this.page.goto("http://localhost:3000/character-counter/");
  }

  // 指定したテキストを textarea の初期値とするページを設定する
  async setContent(defaultText) {
    await this.page.locator("body").evaluate((body, defaultText) => {
      body.innerHTML = `
        <div data-controller="character-counter">
          <label for="textarea">Textarea</label>
          <textarea
            id="textarea"
            data-character-counter-target="text"
            data-action="character-counter#update"
          >${defaultText}</textarea>
          <output data-character-counter-target="output"></output>
        </div>`;
    }, defaultText);
  }
}

const test = base.test.extend({
  characterCounterPage: async ({ page }, use) => {
    const characterCounterPage = new Page(page);
    await characterCounterPage.goto();
    await characterCounterPage.setContent("");
    await use(characterCounterPage);
    await characterCounterPage.setContent("");
  },
});

test("initial value with no input", async ({ characterCounterPage, page }) => {
  await expect(characterCounterPage.output).toHaveText("0");
});

test('initial value with "hoge"', async ({ characterCounterPage, page }) => {
  await characterCounterPage.setContent("hoge");
  await expect(characterCounterPage.output).toHaveText("4");
});

test("count by input", async ({ characterCounterPage, page }) => {
  await characterCounterPage.textarea.fill("hoge");
  await expect(characterCounterPage.output).toHaveText("4");
});
