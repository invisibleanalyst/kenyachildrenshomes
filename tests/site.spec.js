import { test, expect } from "@playwright/test";
import {
  projects,
  countyMap,
  countyProgrammes,
  followUps,
  exampleBudget,
  cashRequired,
} from "../src/data.js";
import { paymentReducer, initialPayment } from "../src/payment.js";

test("five direct routes load local artwork and fonts, and support browser history", async ({
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
            (imgs) =>
              imgs.length > 0 &&
              imgs.every((i) => i.complete && i.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page
        .locator(".single-scene img")
        .evaluateAll((imgs) =>
          imgs.every((i) => getComputedStyle(i).objectFit === "cover"),
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

test("47 county paths and selectors are retained; neutral counties stay neutral with no fabricated measures", async ({
  page,
}) => {
  await page.goto("/");
  const paths = page.locator(".map-drawing path");
  await expect(paths).toHaveCount(47);
  const selector = page.getByLabel("Find a county");
  for (const county of countyMap.locations) {
    await selector.selectOption(county.id);
    await expect(page.locator(".county-heading")).toContainText(
      county.name.toUpperCase(),
    );
  }
  await selector.selectOption("mombasa");
  await expect(page.locator(".county-detail")).toContainText(
    "No programme information published here",
  );
  await expect(page.locator(".county-detail")).toContainText("does not mean");
  await expect(page.locator(".county-detail .text-button")).toHaveCount(0);
  const path = page.getByRole("button", {
    name: "Turkana, no published programme record",
    exact: true,
  });
  const fill = await path.evaluate((el) => getComputedStyle(el).fill);
  await path.focus();
  await path.press("Enter");
  await expect(path).toHaveAttribute("aria-pressed", "true");
  await expect(path).not.toHaveClass(/selected/);
  expect(await path.evaluate((el) => getComputedStyle(el).fill)).toBe(fill);
  await page.getByRole("button", { name: "Zoom in map" }).click();
  await expect(page.locator(".map-drawing svg")).toHaveAttribute(
    "style",
    /1.2/,
  );
  await page.getByRole("button", { name: "Zoom out map" }).click();
});

test("all map modes use shared-programme choices and informative keyboard and hover tooltips", async ({
  page,
}) => {
  for (const route of ["/", "/projects", "/impact"]) {
    await page.goto(route);
    await page.getByLabel("Find a county").selectOption("nairobi");
    await expect(
      page.getByLabel("Choose a programme").locator("option"),
    ).toHaveCount(2);
    await page.getByLabel("Choose a programme").selectOption("jga");
    await expect(page.locator(".county-detail")).toContainText(
      "Jonathan Gloag Academy",
    );
    await expect(page.locator(".county-detail")).toContainText(
      "pupil beneficiary count not defined",
    );
    await page
      .getByRole("button", { name: "View programme", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText(
      "Jonathan Gloag Academy",
    );
    await page.keyboard.press("Escape");
    await page.getByLabel("Find a county").selectOption("narok");
    await page
      .getByRole("button", { name: "View programme", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText("Soila");
    await page.keyboard.press("Escape");
  }
  await page.goto("/projects");
  const paths = page.locator(".map-drawing path");
  for (let i = 0; i < 47; i++) {
    await paths.nth(i).focus();
    await expect(page.getByRole("tooltip")).toBeVisible();
    await expect(page.getByRole("tooltip")).not.toContainText("%");
    await expect(page.getByRole("tooltip")).not.toContainText("attendance");
  }
  await paths.last().blur();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page
    .getByRole("button", {
      name: "Narok, published programme locations",
      exact: true,
    })
    .hover();
  await expect(page.getByRole("tooltip")).toContainText("Soila");
});

test("directory filters six real records; dialog restores and traps focus and carries programme interest", async ({
  page,
}) => {
  await page.goto("/projects");
  const dir = page.locator(".project-directory");
  await expect(dir.locator(".project-card")).toHaveCount(6);
  await expect(
    dir.getByRole("button", { name: "Completed", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Ongoing", exact: true }).click();
  await expect(dir.locator(".project-card")).toHaveCount(6);
  await page.getByLabel("Search projects or counties").fill("none-here");
  await expect(page.getByText("No programmes match.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await page.getByLabel("Search projects or counties").fill("Nairobi");
  await expect(dir.locator(".project-card")).toHaveCount(2);
  await page.getByLabel("Search projects or counties").fill("Butterfly");
  const trigger = dir.getByRole("button", { name: "Explore programme" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("August 2025");
  await expect(dialog).toContainText("KES 40,000 cash still required");
  await expect(dialog).toContainText("KES 10,000 is pledged");
  await expect(dialog).toContainText("does not prove");
  const close = page.getByRole("button", { name: "Close project" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Support a brighter future" }),
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
  await dialog.getByRole("link", { name: "Support a brighter future" }).click();
  await expect(page).toHaveURL(/donate\?programme=butterfly/);
  await expect(page.locator(".interest-note")).toContainText(
    "Butterfly Support",
  );
  await expect(page.locator(".interest-note")).toContainText(
    "without promising restricted allocation",
  );
});

test("impact tiles and delicate trend show explicit follow-up records and accessible units", async ({
  page,
}) => {
  await page.goto("/impact");
  await expect(page.locator(".chart-card")).toHaveCount(0);
  await expect(page.locator(".outcome-card strong")).toHaveText([
    "30",
    "27",
    "90%",
  ]);
  await expect(page.locator(".impact-dashboard>.example-label")).toContainText(
    "not KCH results",
  );
  const line = page.locator(".impact-sparkline");
  await expect(line).toHaveAttribute(
    "aria-label",
    /period A, 21 completed of 30 scheduled follow-ups.*period B, 24.*period C, 27/,
  );
  await expect(line.locator("text")).toHaveText([
    "21 / 30",
    "24 / 30",
    "27 / 30",
  ]);
  await expect(line.locator("path")).toHaveAttribute("stroke-width", "2");
  const ys = await line
    .locator("circle")
    .evaluateAll((nodes) => nodes.map((n) => Number(n.getAttribute("cy"))));
  for (let i = 0; i < 3; i++)
    expect(ys[i]).toBeCloseTo(100 - (followUps[i].completed / 30) * 88);
  await page.getByLabel("Example follow-up period").selectOption("A");
  await expect(page.locator(".outcome-card strong")).toHaveText([
    "30",
    "21",
    "70%",
  ]);
  await page.getByRole("button", { name: /COMPLETION \/ A/ }).click();
  await expect(page.locator(".impact-growth")).toContainText(
    "21 completed divided by 30",
  );
  await expect(page.locator(".impact-growth")).toContainText(
    "not improved child wellbeing",
  );
  await page
    .getByText("Example definitions & source context", { exact: true })
    .click();
  await expect(page.locator(".impact-growth details")).toContainText(
    "both academic-progress and welfare checks",
  );
  await page
    .getByRole("button", { name: "Read The comfort of belonging" })
    .click();
  await expect(page.locator(".impact-story h2")).toContainText(
    "The comfort of belonging",
  );
});

test("data preserves nulls, separates geography and avoids mixing claims or pledges", async ({
  page,
}) => {
  expect(countyProgrammes.nairobi).toEqual(["kibera", "jga"]);
  expect(countyProgrammes.mombasa).toEqual([]);
  expect(projects.find((p) => p.id === "butterfly").countyIds).toEqual([]);
  expect(projects.find((p) => p.id === "jga").children).toBeNull();
  expect(projects.find((p) => p.id === "adoption").children).toBeNull();
  expect(cashRequired(exampleBudget)).toBe(40000);
  expect(followUps.map((r) => [r.completed, r.scheduled])).toEqual([
    [21, 30],
    [24, 30],
    [27, 30],
  ]);
  await page.goto("/projects");
  await expect(page.locator(".bar-column strong")).toHaveText([
    "21",
    "24",
    "27",
  ]);
  await page.getByLabel("Chart metric").selectOption("Scheduled");
  await expect(page.locator(".bar-column strong")).toHaveText([
    "30",
    "30",
    "30",
  ]);
  await page.getByLabel("Search projects or counties").fill("Adoption");
  await page
    .locator(".project-directory")
    .getByRole("button", { name: "Explore programme" })
    .click();
  await expect(page.getByRole("dialog")).not.toContainText("null");
  await expect(page.getByRole("dialog")).not.toContainText("0 children");
});

test("mock adapter ignores duplicate and stale confirmations", () => {
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

test("giving handles failure/cancellation/timeout retries and confirms only after an event", async ({
  page,
}) => {
  const sent = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page.goto("/donate?programme=butterfly");
  await expect(page.locator("form")).toHaveAttribute(
    "data-payment-state",
    "idle",
  );
  await expect(page.getByLabel("Show a sample programme update")).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Give monthly" }).click();
  await expect(page.locator(".monthly-note")).toContainText(
    "does not set up billing",
  );
  await page.getByRole("button", { name: "KES 3,000", exact: true }).click();
  await page.getByLabel("Example name").fill("Sample supporter");
  await page.getByLabel("Example email").fill("example@example.com");
  for (const [button, status] of [
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
    await page.getByRole("button", { name: button, exact: true }).click();
    await expect(page.locator("form")).toHaveAttribute(
      "data-payment-state",
      status,
    );
    await expect(page.getByLabel("Custom donation amount")).toHaveValue("3000");
    await expect(
      page.getByRole("button", { name: "Give monthly" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Example name")).toHaveValue(
      "Sample supporter",
    );
    await expect(page.locator(".interest-note")).toContainText(
      "Butterfly Support",
    );
  }
  await page.getByRole("button", { name: "Retry KES 3,000 gift" }).click();
  await page
    .getByRole("button", { name: "Confirm simulation", exact: true })
    .click();
  await expect(page.locator("form")).toHaveAttribute(
    "data-payment-state",
    "confirmed",
  );
  await expect(page.getByRole("status")).toContainText("No payment was taken");
  await expect(
    page.getByRole("button", { name: "Simulation confirmed", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByLabel("Show a sample programme update"),
  ).not.toBeChecked();
  await expect(page.locator(".sample-update")).toHaveCount(0);
  await page.getByLabel("Show a sample programme update").check();
  await expect(page.locator(".sample-update")).toContainText(
    "not actual KCH reporting or email delivery",
  );
  await expect(page.locator(".sample-update")).toContainText("not KCH results");
  expect(sent).toEqual([]);
});

test("pending times out automatically and no personal detail or update choice is required", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/donate");
  await expect(page.locator("input[required]")).toHaveCount(1);
  await expect(page.getByLabel("Example email")).not.toHaveAttribute(
    "required",
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

test("journey keeps four balanced stages, photographic numerals and a proposed review/update step", async ({
  page,
}) => {
  await page.goto("/donate");
  const journey = page.locator(".donation-journey");
  await expect(journey.locator(".journey-track>button")).toHaveCount(4);
  await expect(journey.locator("h3")).toContainText("Your act of care");
  for (let i = 0; i < 3; i++)
    await journey.getByRole("button", { name: "Follow the next step" }).click();
  await expect(journey.locator("h3")).toContainText("Care, review and update");
  await expect(journey).toContainText("One approved input");
  await expect(journey.locator(".journey-note")).toContainText(
    "not a tracked payment",
  );
  await expect(journey.locator(".journey-note")).toContainText(
    "not actual payment progress",
  );
  await expect(journey.locator(".photo-number")).toHaveText("04");
});

test("Kenyan leadership, historical UK connection, illustrated roles and reports links are accurate", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator(".about-story")).toContainText(
    "Kenyan Board leadership",
  );
  await expect(page.locator(".connection-map")).toBeVisible();
  await expect(page.locator(".map-drawing")).toHaveCount(0);
  await page
    .getByRole("button", { name: "United Kingdom", exact: true })
    .click();
  await expect(page.locator(".connection-detail h3")).toContainText(
    "A historical partnership",
  );
  await expect(page.locator(".connection-detail")).toContainText(
    "does not show a verified current support structure",
  );
  await expect(page.locator(".team-grid article")).toHaveCount(3);
  await expect(page.locator(".team-note")).toContainText("NOT KCH STAFF");
  await expect(page.locator(".team-grid")).not.toContainText("United Kingdom");
  await expect(
    page.locator('footer a[href="https://kch.co.ke/"]'),
  ).toBeVisible();
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

test("mobile navigation, direct routes and expanded states have no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ["/", "/about", "/projects", "/impact", "/donate"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await page.getByLabel("Find a county").selectOption("narok");
  await page.getByRole("button", { name: "View programme" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await page.goto("/donate?programme=butterfly");
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
});

test("art direction retains proportional scene fitting, photographic numerals and role portrait geometry", async ({
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
    await expect(page.locator(".process-row .photo-number")).toHaveText([
      "01",
      "02",
      "03",
    ]);
    expect(
      await page
        .locator(".photo-number.single-scene-number")
        .evaluateAll(
          (nodes) =>
            nodes.length > 0 &&
            nodes.every((n) => getComputedStyle(n).backgroundSize === "cover"),
        ),
    ).toBe(true);
    expect(
      await page
        .locator(".button")
        .first()
        .evaluate((el) => getComputedStyle(el).borderRadius),
    ).toBe("100px");
  }
  await page.goto("/about");
  await expect(page.locator(".team-grid .single-scene")).toHaveCount(0);
  expect(
    await page
      .locator(".team-grid .editorial-art")
      .evaluateAll((nodes) =>
        nodes.every((n) =>
          getComputedStyle(n).backgroundImage.includes("kenya-stories.png"),
        ),
      ),
  ).toBe(true);
});
