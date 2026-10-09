import { test, expect } from "@playwright/test";
test("all five discovery routes load imagery, fonts, and browser history", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of ["/", "/about", "/projects", "/impact", "/donate"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll(
            (images) =>
              images.length > 0 &&
              images.every((i) => i.complete && i.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () =>
          document.fonts.check("16px Figtree") &&
          document.fonts.check('16px "DM Mono"'),
      ),
    ).toBe(true);
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/donate$/);
  expect(errors).toEqual([]);
});
test("atlas supports all 47 counties, keyboard selection and project details", async ({
  page,
}) => {
  await page.goto("/");
  const paths = page.locator(".d-atlas-county-paths path");
  await expect(paths).toHaveCount(47);
  for (let i = 0; i < 47; i++) {
    const county = (await paths.nth(i).getAttribute("aria-label")).split(
      ",",
    )[0];
    await paths.nth(i).focus();
    await expect(page.locator(".d-atlas-story")).toContainText(
      county.toUpperCase(),
    );
  }
  await page.getByLabel("Find a county").selectOption({ label: "Mombasa" });
  await expect(page.locator(".d-atlas-story")).toContainText("MOMBASA");
  const turkana = page.getByRole("button", { name: "Turkana, Active project" });
  await turkana.focus();
  await turkana.press("Enter");
  await expect(turkana).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Read the project story" }).click();
  await expect(page.getByRole("dialog")).toContainText("Turkana");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("atlas layers alter the visible project emphasis", async ({ page }) => {
  await page.goto("/projects");
  const map = page.locator(".d-atlas");
  await map.getByRole("button", { name: "Completed", exact: true }).click();
  await expect(
    map.locator(".d-atlas-county-paths path:not(.faded)"),
  ).toHaveCount(16);
  await expect(map.locator(".d-atlas-toolbar")).toContainText(
    "16 PROJECTS IN VIEW",
  );
});
test("delivery ring chart and project journal show distinct stages and filters", async ({
  page,
}) => {
  await page.goto("/projects");
  const chart = page.locator(".d-delivery-chart");
  await chart.getByRole("button", { name: "Planned", exact: true }).click();
  await expect(chart.locator(".d-donut-wrap")).toContainText("15");
  await expect(chart.locator(".d-stage-story")).toContainText(
    "Possibilities taking shape",
  );
  const directory = page.locator(".d-project-directory");
  await expect(directory.locator(".d-journal-row")).toHaveCount(47);
  await directory
    .getByRole("button", { name: "Completed", exact: true })
    .click();
  await expect(directory.locator(".d-journal-row")).toHaveCount(16);
  await page.getByLabel("Search projects or counties").fill("unmatched");
  await expect(page.getByText("No projects match.")).toBeVisible();
  await page.getByRole("button", { name: "Reset your search" }).click();
  await page.getByLabel("Search projects or counties").fill("Nairobi");
  await expect(directory.locator(".d-journal-row")).toHaveCount(1);
  await directory.locator(".d-journal-row").click();
  await expect(page.getByRole("dialog")).toContainText("Nairobi");
});
test("outcome river responds to measure and year and impact atlas changes layers", async ({
  page,
}) => {
  await page.goto("/impact");
  const river = page.locator(".d-outcome-river");
  const before = await river.locator(".d-river-total").textContent();
  await river.getByRole("button", { name: "Wellbeing", exact: true }).click();
  expect(await river.locator(".d-river-total").textContent()).not.toEqual(
    before,
  );
  const current = await river.locator(".d-river-total").textContent();
  await page.getByLabel("Impact reporting year").selectOption("2024");
  expect(await river.locator(".d-river-total").textContent()).not.toEqual(
    current,
  );
  const map = page.locator(".d-atlas-impact");
  await map.getByRole("button", { name: "Belonging", exact: true }).click();
  await expect(map.locator(".d-atlas-story")).toContainText(
    "families receiving support",
  );
});
test("story chapters swap their narrative and image", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Discover A world to discover." })
    .click();
  await expect(page.locator(".d-chapter-copy h2")).toContainText(
    "A world to discover",
  );
  await expect(page.locator(".d-chapter-image img")).toHaveAttribute(
    "src",
    "/images/discovery-together.png",
  );
});
test("giving theme, amount, payment choice, and journey are interactive without charging", async ({
  page,
}) => {
  const posted = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posted.push(r.url());
  });
  await page.goto("/donate");
  await page
    .locator(".d-giving-themes")
    .getByRole("button", { name: /Wellbeing/ })
    .click();
  await expect(page.locator(".d-giving-photo")).toContainText(
    "Healthy beginnings",
  );
  await page.getByRole("button", { name: "Give monthly" }).click();
  await page
    .locator(".d-gift-amounts")
    .getByRole("button", { name: "3,000", exact: true })
    .click();
  await page.getByRole("button", { name: "Card", exact: true }).click();
  await expect(page.getByLabel("M-Pesa phone number")).toHaveCount(0);
  await page.getByLabel("Email address").fill("example@example.com");
  await page
    .getByRole("button", { name: "Preview KES 3,000 monthly gift" })
    .click();
  await expect(page.getByRole("status")).toContainText("No payment was taken");
  expect(posted).toEqual([]);
  await page.getByRole("button", { name: "M-Pesa", exact: true }).click();
  await page.getByLabel("M-Pesa phone number").fill("0712345678");
  await page
    .getByRole("button", { name: "Preview KES 3,000 monthly gift" })
    .click();
  await expect(page.getByRole("status")).toContainText("No payment was taken");
  const journey = page.locator(".d-gift-route");
  for (let i = 0; i < 3; i++)
    await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText("Everyday care");
});
test("about UK and Kenya story connection switches", async ({ page }) => {
  await page.goto("/about");
  await page
    .getByRole("button", { name: "United Kingdom", exact: true })
    .click();
  await expect(page.locator(".d-bridge-copy h3")).toContainText(
    "A community of possibility",
  );
  await expect(page.locator(".d-team-portrait")).toHaveCount(3);
});
test("mobile pages fit the viewport and the menu closes on navigation", async ({
  page,
}) => {
  for (const width of [375, 320]) {
    await page.setViewportSize({ width, height: 812 });
    for (const route of ["/", "/about", "/projects", "/impact", "/donate"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
