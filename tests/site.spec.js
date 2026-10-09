import { test, expect } from "@playwright/test";
test("five pages render, photos and fonts load, and routes support browser history", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of ["/", "/about", "/projects", "/impact", "/donate"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".editorial-art").first()).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator(".single-scene img")
          .evaluateAll(
            (images) =>
              images.length > 0 &&
              images.every((img) => img.complete && img.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page
        .locator(".single-scene img")
        .evaluateAll((images) =>
          images.every((img) => getComputedStyle(img).objectFit === "cover"),
        ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () =>
          document.fonts.check("16px Figtree") &&
          document.fonts.check('16px "DM Mono"'),
      ),
    ).toBe(true);
  }
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/donate$/);
  expect(errors).toEqual([]);
});
test("all 47 counties are interactive through map, keyboard and selector", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".map-drawing path")).toHaveCount(47);
  await page.getByLabel("Find a county").selectOption({ label: "Mombasa" });
  await expect(page.locator(".county-heading")).toContainText("MOMBASA");
  const path = page.getByRole("button", { name: "Turkana, Active project" });
  await path.focus();
  await path.press("Enter");
  await expect(path).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".county-heading")).toContainText("TURKANA");
  await page.getByRole("button", { name: "View project" }).click();
  await expect(page.getByRole("dialog")).toContainText("Turkana");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("project filters and empty state derive from sample data", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator(".project-directory .project-card")).toHaveCount(
    47,
  );
  await page.getByRole("button", { name: "Completed", exact: true }).click();
  await expect(page.locator(".project-directory .project-card")).toHaveCount(
    16,
  );
  await page.getByLabel("Search projects or counties").fill("no-such-county");
  await expect(page.getByText("No projects match.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByLabel("Search projects or counties").fill("Nairobi");
  await expect(page.locator(".project-directory .project-card")).toHaveCount(1);
  await page
    .locator(".project-directory")
    .getByRole("button", { name: "Explore project" })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Nairobi");
});
test("impact uses outcome measures and reporting years rather than project statuses", async ({
  page,
}) => {
  await page.goto("/impact");
  await expect(page.locator(".chart-card")).toHaveCount(0);
  const before = await page.locator(".outcome-card strong").allTextContents();
  await page.getByLabel("Impact reporting year").selectOption("2024");
  expect(
    await page.locator(".outcome-card strong").allTextContents(),
  ).not.toEqual(before);
  await page
    .getByRole("button", { name: "Read The comfort of belonging" })
    .click();
  await expect(page.locator(".impact-story h2")).toContainText(
    "The comfort of belonging",
  );
  const map = page.locator(".map-impact");
  await map.getByRole("button", { name: "Wellbeing", exact: true }).click();
  await expect(map.locator(".county-detail")).toContainText("nutritious meals");
});
test("donation form validates and explicitly avoids charging or transmitting details", async ({
  page,
}) => {
  const sent = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page.goto("/donate");
  await page.getByRole("button", { name: "Give monthly" }).click();
  await page.getByRole("button", { name: "KES 3,000", exact: true }).click();
  await page.getByRole("button", { name: "Card", exact: true }).click();
  await expect(page.getByLabel("M-Pesa phone number")).toHaveCount(0);
  await page.getByLabel("Email address").fill("example@example.com");
  await page
    .getByRole("button", { name: "Preview KES 3,000 monthly gift" })
    .click();
  await expect(page.getByRole("status")).toContainText("no payment was taken");
  expect(sent).toEqual([]);
  await page.getByRole("button", { name: "M-Pesa", exact: true }).click();
  await page.getByLabel("M-Pesa phone number").fill("0712345678");
  await page
    .getByRole("button", { name: "Preview KES 3,000 monthly gift" })
    .click();
  await expect(page.getByRole("status")).toContainText("no payment was taken");
});
test("mobile pages have no horizontal overflow and navigation opens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ["/", "/about", "/projects", "/impact", "/donate"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await page.screenshot({ path: "/tmp/kch-mobile.png", fullPage: true });
});

test("hover and keyboard tooltips show county assessment and next action", async ({
  page,
}) => {
  await page.goto("/projects");
  const paths = page.locator(".map-drawing path");
  await expect(paths).toHaveCount(47);
  for (let i = 0; i < 47; i++) {
    await paths.nth(i).focus();
    const tip = page.getByRole("tooltip");
    await expect(tip).toBeVisible();
    await expect(tip).toContainText("Next:");
  }
  await page.locator(".map-drawing path").last().blur();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
});
test("donation journey advances through payment, allocation, and local care", async ({
  page,
}) => {
  await page.goto("/donate");
  const journey = page.locator(".donation-journey");
  await expect(journey.locator("h3")).toContainText("Your act of care");
  await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText("A confirmed payment");
  await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText("Support takes shape");
  await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText(
    "Care reaches everyday life",
  );
});
test("about has a UK–Kenya connection map and role-based team portraits", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator(".connection-map")).toBeVisible();
  await expect(page.locator(".map-drawing")).toHaveCount(0);
  await expect(page.locator(".team-grid article")).toHaveCount(3);
  await page
    .getByRole("button", { name: "United Kingdom", exact: true })
    .click();
  await expect(page.locator(".connection-detail h3")).toContainText(
    "A community of supporters",
  );
});

test("care images crop naturally and team portraits keep their original artwork", async ({
  page,
}) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.locator(".main-cutout img")).toHaveAttribute(
      "src",
      "/images/children-care.png",
    );
    await expect(page.locator(".small-cutout img")).toHaveAttribute(
      "src",
      "/images/learning-care.png",
    );
    expect(
      await page
        .locator(".photo-number.single-scene-number")
        .evaluateAll(
          (nodes) =>
            nodes.length > 0 &&
            nodes.every(
              (node) => getComputedStyle(node).backgroundSize === "cover",
            ),
        ),
    ).toBe(true);
  }
  await page.goto("/about");
  await expect(page.locator(".team-grid .single-scene")).toHaveCount(0);
  expect(
    await page
      .locator(".team-grid .editorial-art")
      .evaluateAll((nodes) =>
        nodes.every((node) =>
          getComputedStyle(node).backgroundImage.includes("kenya-stories.png"),
        ),
      ),
  ).toBe(true);
});
