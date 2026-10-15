import { test, expect } from "@playwright/test";
import {
  countyMap,
  countyProgrammes,
  projects,
  followUps,
  exampleBudget,
  cashRequired,
} from "../src/data.js";
import { paymentReducer, initialPayment } from "../src/payment.js";

test("all five discovery routes load local imagery and fonts with browser history", async ({
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
            (imgs) =>
              imgs.length > 0 &&
              imgs.every((i) => i.complete && i.naturalWidth > 0),
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

test("atlas retains 47 accessible counties but marks only published county locations and no invented routes", async ({
  page,
}) => {
  await page.goto("/");
  const paths = page.locator(".d-atlas-county-paths path");
  await expect(paths).toHaveCount(47);
  for (let i = 0; i < 47; i++) {
    await paths.nth(i).focus();
    await expect(page.locator(".d-atlas-story")).toContainText(
      countyMap.locations[i].name.toUpperCase(),
    );
  }
  for (const county of countyMap.locations) {
    await page.getByLabel("Find a county").selectOption(county.id);
    await expect(page.locator(".d-atlas-story")).toContainText(
      county.name.toUpperCase(),
    );
  }
  await expect(page.locator(".d-atlas-connections>path")).toHaveCount(0);
  await expect(page.locator(".d-atlas-connections>circle")).toHaveCount(2);
  expect(
    await page
      .locator("[data-location]")
      .evaluateAll((nodes) => nodes.map((n) => n.dataset.location)),
  ).toEqual(["nairobi", "narok"]);
  await page.getByLabel("Find a county").selectOption("mombasa");
  await expect(page.locator(".d-atlas-story")).toContainText(
    "No programme information published here",
  );
  await expect(page.locator(".d-atlas-story")).toContainText("does not mean");
  await expect(page.locator(".d-atlas-story .d-text-link")).toHaveCount(0);
  const turkana = page.getByRole("button", {
    name: "Turkana, no published programme record",
    exact: true,
  });
  const fill = await turkana.evaluate((n) => getComputedStyle(n).fill);
  await turkana.focus();
  await turkana.press("Enter");
  await expect(turkana).toHaveAttribute("aria-pressed", "true");
  await expect(turkana).not.toHaveClass(/selected/);
  expect(await turkana.evaluate((n) => getComputedStyle(n).fill)).toBe(fill);
  await expect(page.locator(".d-atlas-pin text")).toHaveText("TURKANA");
  await expect(page.locator(".d-atlas-story img")).toBeVisible();
});

test("all atlas modes select multiple Nairobi programmes and Soila in Narok", async ({
  page,
}) => {
  for (const route of ["/", "/projects", "/impact"]) {
    await page.goto(route);
    const atlas = page.locator(".d-atlas");
    await page.getByLabel("Choose a programme").selectOption("jga");
    await expect(atlas.locator(".d-atlas-story")).toContainText(
      "Jonathan Gloag Academy",
    );
    await expect(atlas).toContainText("pupil beneficiary count not defined");
    await atlas
      .getByRole("button", { name: "Read the programme story" })
      .click();
    await expect(page.getByRole("dialog")).toContainText(
      "Jonathan Gloag Academy",
    );
    await page.keyboard.press("Escape");
    await atlas.getByRole("button", { name: "Narok", exact: true }).click();
    await expect(atlas.locator(".d-atlas-story")).toContainText("Soila");
    await expect(page.getByLabel("Choose a programme")).toHaveCount(0);
    await atlas
      .getByRole("button", { name: "Read the programme story" })
      .click();
    await expect(page.getByRole("dialog")).toContainText("Soila");
    await page.keyboard.press("Escape");
  }
});

test("journal filters actual programme records and dialog traps/restores focus and carries interest", async ({
  page,
}) => {
  await page.goto("/projects");
  const dir = page.locator(".d-project-directory");
  await expect(dir.locator(".d-journal-row")).toHaveCount(6);
  await dir.getByRole("button", { name: "Ongoing", exact: true }).click();
  await expect(dir.locator(".d-journal-row")).toHaveCount(6);
  await expect(
    dir.getByRole("button", { name: "Completed", exact: true }),
  ).toHaveCount(0);
  await page.getByLabel("Search projects or counties").fill("unmatched");
  await expect(page.getByText("No programmes match.")).toBeVisible();
  await page.getByRole("button", { name: "Reset your search" }).click();
  await page.getByLabel("Search projects or counties").fill("Nairobi");
  await expect(dir.locator(".d-journal-row")).toHaveCount(2);
  await page.getByLabel("Search projects or counties").fill("Butterfly");
  const trigger = dir.locator(".d-journal-row");
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("AUGUST 2025");
  await expect(dialog).toContainText("KES 40,000 cash still required");
  await expect(dialog).toContainText("KES 10,000 is pledged");
  const close = page.getByRole("button", { name: "Close project" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Help the next chapter unfold" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await dialog
    .getByText("Sources, periods & example method", { exact: true })
    .click();
  await expect(dialog).toContainText("not a reporting period");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await trigger.click();
  await dialog
    .getByRole("link", { name: "Help the next chapter unfold" })
    .click();
  await expect(page).toHaveURL(/donate\?programme=butterfly/);
  await expect(page.locator(".d-interest-note")).toContainText(
    "Butterfly Support",
  );
  await expect(page.locator(".d-interest-note")).toContainText(
    "without promising restricted allocation",
  );
});

test("delivery ring is 27 of 30 example follow-ups, not programme completion", async ({
  page,
}) => {
  await page.goto("/projects");
  const chart = page.locator(".d-delivery-chart");
  await expect(chart.locator(".d-donut-wrap")).toContainText("27");
  await expect(chart.locator("svg")).toHaveAttribute(
    "aria-label",
    /not KCH results.*27 of 30.*90% completion/,
  );
  await expect(chart.locator(".d-delivery-completed")).toHaveAttribute(
    "stroke-dasharray",
    "90 10",
  );
  await expect(chart).toContainText("not how finished a care programme is");
  await chart.getByRole("button", { name: "Scheduled", exact: true }).click();
  await expect(chart.locator(".d-donut-wrap strong")).toHaveText("30");
  await expect(chart.locator(".d-stage-story")).toContainText(
    "Three of the 30",
  );
  await chart.getByRole("button", { name: "Completed", exact: true }).click();
  await expect(chart.locator(".d-stage-story")).toContainText(
    "recorded and reviewed",
  );
});

test("outcome river draws one data-driven line and one area on fixed zero-to-30 scale", async ({
  page,
}) => {
  await page.goto("/impact");
  const river = page.locator(".d-outcome-river");
  await expect(river.locator(".d-river-total")).toHaveText("27");
  await expect(river.locator("path[data-series]")).toHaveCount(1);
  await expect(river.locator("path[data-area]")).toHaveCount(1);
  await expect(river.locator("svg[role=img]")).toHaveAttribute(
    "aria-label",
    /zero-to-30 scale.*21 of 30.*24 of 30.*27 of 30/,
  );
  const points = await river
    .locator("circle")
    .evaluateAll((nodes) =>
      nodes.map((n) => [
        Number(n.getAttribute("cx")),
        Number(n.getAttribute("cy")),
      ]),
    );
  expect(points).toEqual([
    [40, 90],
    [350, 70],
    [660, 50],
  ]);
  await page.getByLabel("Example follow-up period").selectOption("A");
  await expect(river.locator(".d-river-total")).toHaveText("21");
  await river.getByRole("button", { name: "Completion", exact: true }).click();
  await expect(river.locator(".d-river-total")).toHaveText("70%");
  await river.getByRole("button", { name: "Period B 24 / 30" }).click();
  await expect(river.locator(".d-river-total")).toHaveText("80%");
  await river
    .getByText("Definitions & source context", { exact: true })
    .click();
  await expect(river).toContainText("not an uncertainty band or forecast");
  await expect(river).toContainText(
    "both academic-progress and welfare checks",
  );
  await expect(page.locator(".d-chapter-copy")).toContainText("does not prove");
  await expect(page.locator(".d-chapter-copy")).toContainText(
    "not KCH results",
  );
});

test("chapter stories preserve genuine date, photographic scenes and a programme support route", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".d-chapter-copy")).toContainText("August 2025");
  await expect(
    page.locator('.d-chapter-copy a[href*="butterfly-childrens-camp"]'),
  ).toBeVisible();
  await expect(
    page
      .locator(".d-chapter-copy")
      .getByRole("link", { name: "Support the next chapter" }),
  ).toHaveAttribute("href", "/donate?programme=butterfly");
  await page
    .getByRole("button", { name: "Discover A world to discover." })
    .click();
  await expect(page.locator(".d-chapter-copy h2")).toHaveText(
    "A world to discover.",
  );
  await expect(page.locator(".d-chapter-image img")).toHaveAttribute(
    "src",
    "/images/discovery-together.png",
  );
  await expect(page.locator(".d-chapter-copy")).toContainText(
    "not a count of charity beneficiaries",
  );
  await expect(page.locator(".d-image-caption")).toContainText(
    "ILLUSTRATIVE ARTWORK",
  );
});

test("explicit example records, nulls and pledge accounting remain separate from KCH claims", async ({
  page,
}) => {
  expect(countyProgrammes.nairobi).toEqual(["kibera", "jga"]);
  expect(countyProgrammes.mombasa).toEqual([]);
  expect(projects.find((p) => p.id === "butterfly").countyIds).toEqual([]);
  expect(projects.find((p) => p.id === "adoption").children).toBeNull();
  expect(cashRequired(exampleBudget)).toBe(40000);
  expect(followUps.map((r) => [r.completed, r.scheduled])).toEqual([
    [21, 30],
    [24, 30],
    [27, 30],
  ]);
  await page.goto("/projects");
  await page.getByLabel("Search projects or counties").fill("Adoption");
  await page.locator(".d-project-directory .d-journal-row").click();
  await expect(page.getByRole("dialog")).not.toContainText("null");
  await expect(page.getByRole("dialog")).not.toContainText("0 children");
});

test("mock payment adapter ignores stale and duplicate confirmations", () => {
  let state = paymentReducer(initialPayment, { type: "start" });
  expect(state.status).toBe("pending");
  state = paymentReducer(state, {
    type: "result",
    status: "failed",
    attempt: 1,
  });
  state = paymentReducer(state, { type: "start" });
  expect(
    paymentReducer(state, { type: "result", status: "confirmed", attempt: 1 }),
  ).toEqual(state);
  state = paymentReducer(state, {
    type: "result",
    status: "confirmed",
    attempt: 2,
  });
  expect(state.confirmationCount).toBe(1);
  expect(
    paymentReducer(state, { type: "result", status: "confirmed", attempt: 2 }),
  ).toEqual(state);
  expect(paymentReducer(state, { type: "start" })).toEqual(state);
});

test("giving theme and intention survive retries; confirmation and optional updates follow separate events", async ({
  page,
}) => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/donate?programme=butterfly");
  await expect(page.locator("form")).toHaveAttribute(
    "data-payment-state",
    "idle",
  );
  await page
    .locator(".d-giving-themes")
    .getByRole("button", { name: /Wellbeing/ })
    .click();
  await expect(page.locator(".d-giving-photo")).toContainText(
    "Healthy beginnings",
  );
  await page.getByRole("button", { name: "Give monthly" }).click();
  await expect(page.locator(".d-monthly-note")).toContainText(
    "does not set up billing",
  );
  await page
    .locator(".d-gift-amounts")
    .getByRole("button", { name: "3,000", exact: true })
    .click();
  await page.getByLabel("Example email").fill("supporter@example.com");
  for (const [label, state] of [
    ["Simulate failure", "failed"],
    ["Cancel simulation", "cancelled"],
    ["Simulate timeout", "timed-out"],
  ]) {
    await page
      .getByRole("button", { name: /^(Preview|Retry) KES 3,000 gift$/ })
      .click();
    await expect(page.locator("form")).toHaveAttribute(
      "data-payment-state",
      "pending",
    );
    await expect(page.getByRole("status")).toContainText("Waiting");
    await expect(
      page.locator(".d-giving-themes button").first(),
    ).toBeDisabled();
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator("form")).toHaveAttribute(
      "data-payment-state",
      state,
    );
    await expect(page.getByLabel("Custom donation amount")).toHaveValue("3000");
    await expect(
      page.getByRole("button", { name: "Give monthly" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Example email")).toHaveValue(
      "supporter@example.com",
    );
    await expect(
      page
        .locator(".d-giving-themes")
        .getByRole("button", { name: /Wellbeing/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".d-interest-note")).toContainText(
      "Butterfly Support",
    );
  }
  await page.getByRole("button", { name: "Retry KES 3,000 gift" }).click();
  await page
    .getByRole("button", { name: "Confirm simulation", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("No payment was taken");
  await expect(
    page.getByRole("button", { name: "Simulation confirmed", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByLabel("Show a sample programme update"),
  ).not.toBeChecked();
  await expect(page.locator(".d-sample-update")).toHaveCount(0);
  await page.getByLabel("Show a sample programme update").check();
  await expect(page.locator(".d-sample-update")).toContainText(
    "not actual KCH reporting or email delivery",
  );
  expect(posts).toEqual([]);
});

test("automatic timeout and optional details do not require real personal data", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/donate");
  await expect(page.locator("input[required]")).toHaveCount(1);
  await expect(page.getByLabel("Show a sample programme update")).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Preview KES 1,500 gift" }).click();
  await page.clock.fastForward(31000);
  await expect(page.locator("form")).toHaveAttribute(
    "data-payment-state",
    "timed-out",
  );
  await expect(
    page.getByRole("link", { name: "Giving help · contact KCH" }),
  ).toHaveAttribute("href", "mailto:fundraising@kch.co.ke");
});

test("large-numeral journey ends with review and approved update as a proposed process", async ({
  page,
}) => {
  await page.goto("/donate");
  const journey = page.locator(".d-gift-route");
  await expect(journey.locator(".d-gift-steps>button")).toHaveCount(4);
  for (let i = 0; i < 3; i++)
    await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText("Care, review and update");
  await expect(journey.locator(".d-route-number")).toHaveText("04");
  await expect(journey).toContainText("One input could inform");
  await expect(journey).toContainText("rather than a live payment tracker");
});

test("Kenyan leadership and historical partnership replace UK base claims; footer exposes reports and help", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator(".d-about-letter")).toContainText(
    "Kenyan Board leadership",
  );
  await page
    .getByRole("button", { name: "United Kingdom", exact: true })
    .click();
  await expect(page.locator(".d-bridge-copy h3")).toContainText(
    "A historical partnership",
  );
  await expect(page.locator(".d-bridge-copy")).toContainText(
    "does not establish current partners",
  );
  await expect(page.locator(".d-team-portrait")).toHaveCount(3);
  await expect(page.locator(".d-team")).toContainText("not KCH staff");
  await expect(
    page.locator('footer a[href="https://kch.co.ke/"]'),
  ).toBeVisible();
  await expect(page.locator(".d-footer-links>*")).toHaveCount(3);
  await page
    .locator("footer")
    .getByRole("link", { name: "Reports & financials" })
    .click();
  await expect(page).toHaveURL(/impact#reports$/);
  await expect
    .poll(() =>
      page
        .locator("#reports")
        .evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
    )
    .toBeLessThan(5);
  await expect(page.locator("#reports")).toContainText("No KCH annual report");
  await expect(
    page.getByRole("link", { name: "Request reports" }),
  ).toHaveAttribute("href", /^mailto:info@kch.co.ke/);
});

test("mobile pages fit 320 and 375px, navigation works and hero jump exposes the giving form", async ({
  page,
}) => {
  for (const width of [320, 375]) {
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
    const hero=await page.locator('.d-hero').boundingBox();
    const jump=await page.getByRole('link',{name:'Go to giving form'}).boundingBox();
    expect(jump.y+jump.height).toBeLessThanOrEqual(hero.y+hero.height-65);
    await page.getByRole("link", { name: "Go to giving form" }).click();
    await expect(page).toHaveURL(/donate#giving-form$/);
    await expect(page.locator("form")).toBeFocused();
    await expect
      .poll(() =>
        page
          .locator("form")
          .evaluate((el) => Math.abs(el.getBoundingClientRect().top)),
      )
      .toBeLessThan(5);
    await page.getByRole("button", { name: "Preview KES 1,500 gift" }).click();
    await page
      .getByRole("button", { name: "Confirm simulation", exact: true })
      .click();
    await page.getByLabel("Show a sample programme update").check();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/donate");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("split giving photograph and form retain their row and photo-first mobile stacking", async ({
  page,
}) => {
  await page.goto("/donate");
  for (const width of [320, 375, 760, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    const image = await page.locator(".d-giving-photo").boundingBox();
    const form = await page.locator(".d-giving-form").boundingBox();
    if (width > 760) {
      expect(Math.abs(image.y - form.y)).toBeLessThan(1);
      expect(Math.abs(image.height - form.height)).toBeLessThan(1);
      expect(image.x).toBeGreaterThanOrEqual(form.x + form.width - 1);
    } else {
      expect(Math.abs(image.x - form.x)).toBeLessThan(1);
      expect(form.y).toBeGreaterThanOrEqual(image.y + image.height - 1);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("cinematic heroes keep full scenic height, waves, crop and contrasting captions", async ({
  page,
}) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const hero = page.locator(".d-hero");
    expect((await hero.boundingBox()).height).toBeGreaterThanOrEqual(
      width === 375 ? 780 : 850,
    );
    await expect(hero.locator("img")).toHaveAttribute(
      "src",
      "/images/discovery-journey.png",
    );
    await expect(hero.locator(".d-wave path")).toHaveAttribute(
      "d",
      "M0 50C120 95 255 0 400 40S660 100 790 50 1100 25 1230 50 1370 70 1440 25V100H0Z",
    );
    expect(
      await hero
        .locator("img")
        .evaluate((el) => getComputedStyle(el).objectFit),
    ).toBe("cover");
    await expect(page.locator(".d-atlas-orbits")).toBeVisible();
    const caption = page.locator(".d-image-caption");
    await expect(caption).toContainText("ILLUSTRATIVE ARTWORK");
    expect(await caption.evaluate((el) => getComputedStyle(el).color)).toBe(
      "rgb(255, 253, 246)",
    );
  }
});
