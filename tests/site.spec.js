import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/about",
  "/projects",
  "/impact",
  "/donate",
  "/feedback",
  "/staff",
];
async function assignAction(page) {
  await page
    .getByRole("button", { name: "Review programme evidence", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Identify materials and travel need" })
    .click();
  await page
    .getByRole("button", { name: "Assign programme action", exact: true })
    .click();
}
test("all public and staff routes render, images/fonts load and history works", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of routes) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((xs) =>
            xs.every((x) => x.complete && x.naturalWidth > 0),
          ),
      )
      .toBe(true);
    expect(
      await page.evaluate(() => document.fonts.check("16px Figtree")),
    ).toBe(true);
  }
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await page.goBack();
  await expect(page).toHaveURL(/\/staff$/);
  expect(errors).toEqual([]);
});
test("complete scenario separates evidence, funding, operational result and public approval", async ({
  page,
}) => {
  await page.goto("/staff");
  await expect(
    page.getByRole("button", { name: "Assign programme action", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Approve public summary" }),
  ).toBeDisabled();
  await assignAction(page);
  await page
    .getByRole("button", { name: "Assign and record follow-up" })
    .click();
  await page
    .getByRole("button", { name: "Close enquiry", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Record separate KES 30,000 confirmed contribution",
    })
    .click();
  const funding = page.getByLabel("Programme funding");
  await expect(funding).toContainText("KES 90,000");
  await expect(funding).toContainText("KES 30,000");
  await expect(
    page.getByText("Review result: Not recorded.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Approve public summary" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Match payment to Room to learn" })
    .click();
  await expect(funding).toContainText("KES 95,000");
  await expect(funding).toContainText("KES 25,000");
  await page.getByLabel("Simulated review result").selectOption("delivered");
  await page.getByRole("button", { name: "Record operational review" }).click();
  await page.goto("/");
  await expect(page.locator(".approved-update")).not.toContainText("32 of 40");
  await page.goto("/staff");
  await page.getByRole("button", { name: "Approve public summary" }).click();
  await page.goto("/");
  await expect(page.locator(".approved-update")).toContainText("32 of 40");
  await page.goto("/impact");
  await page.getByLabel("Reporting period").selectOption("review");
  await expect(page.locator(".attendance-chart")).toContainText(
    "32 / 40 (80%)",
  );
  await expect(page.locator(".attendance-chart")).toContainText(
    "24 / 40 (60%)",
  );
  await page.goto("/staff");
  await page.getByRole("button", { name: "Reset fictional scenario" }).click();
  await expect(page.getByLabel("Programme funding")).toContainText(
    "KES 60,000",
  );
  await page.goto("/");
  await expect(page.locator(".approved-update")).not.toContainText("32 of 40");
});
test("delayed operational review never publishes a successful result or an October chart", async ({
  page,
}) => {
  await page.goto("/staff");
  await assignAction(page);
  await page.getByLabel("Simulated review result").selectOption("delayed");
  await page.getByRole("button", { name: "Record operational review" }).click();
  await page.getByRole("button", { name: "Approve public summary" }).click();
  await page.goto("/");
  await expect(page.locator(".approved-update")).toContainText(
    "Delivery has been delayed",
  );
  await expect(page.locator(".programme-summary")).not.toContainText(
    "32 of 40",
  );
  await page.goto("/impact");
  await expect(
    page.locator('#reporting-period option[value="review"]'),
  ).toBeDisabled();
  await expect(page.locator(".attendance-chart")).not.toContainText("32 / 40");
});
test("giving handles pending, failed, cancelled and confirmed without transmitting personal information", async ({
  page,
}) => {
  const posts = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/donate");
  await page.getByLabel("Amount in KES").fill("99");
  await page.getByRole("button", { name: "Start simulated gift" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Amount in KES").fill("3000");
  await page.getByLabel("Frequency", { exact: true }).selectOption("Monthly");
  await page.getByLabel("Payment method (simulated)").selectOption("Card");
  await page
    .getByLabel("Show optional approved programme updates", { exact: false })
    .check();
  for (const status of ["failed", "cancelled", "confirmed"]) {
    await page.getByRole("button", { name: "Start simulated gift" }).click();
    await expect(page.getByRole("status")).toContainText("Payment pending");
    await expect(page.getByLabel("Programme funding")).toContainText(
      "KES 60,000",
    );
    await page
      .getByRole("button", { name: `Simulate ${status}`, exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(`Payment ${status}`);
  }
  await expect(page.getByRole("status")).toContainText("DEMO-GIFT-3");
  await expect(page.getByLabel("Programme funding")).toContainText(
    "KES 63,000",
  );
  expect(posts).toEqual([]);
  await expect(page.locator("input[type=email],input[type=tel]")).toHaveCount(
    0,
  );
  await page.goto("/staff");
  await expect(
    page.getByText("Repeat supporters / identified appeal supporters"),
  ).toHaveCount(1);
  await page.getByLabel("Payment status filter").selectOption("pending");
  await expect(page.locator("tbody tr")).toHaveCount(1);
});
test("sample supporter feedback stays private and can be assigned, answered and closed", async ({
  page,
}) => {
  await page.goto("/feedback");
  await page
    .getByLabel("Demonstration question")
    .selectOption("Where can I find approved programme updates?");
  await page.getByRole("button", { name: "Submit sample question" }).click();
  await expect(page.getByRole("status")).toContainText(
    "added to the staff queue",
  );
  await page.goto("/staff");
  const q = page.locator("article").filter({
    has: page.getByRole("heading", { name: "ENQ-002", exact: true }),
  });
  await expect(q).toContainText("Unassigned");
  await expect(
    q.getByRole("button", { name: "Close enquiry", exact: true }),
  ).toBeDisabled();
  await q.getByRole("button", { name: "Assign and record follow-up" }).click();
  await expect(q).toContainText("Status: addressed");
  await q.getByRole("button", { name: "Close enquiry", exact: true }).click();
  await expect(q).toContainText("Status: closed");
  await expect(q).toContainText("None linked");
  await page.goto("/");
  await expect(page.locator("main")).not.toContainText(
    "Where can I find approved programme updates?",
  );
});
test("programme filter, mobile layout and keyboard navigation", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByLabel("Find a demonstration programme").fill("unknown");
  await expect(
    page.getByRole("heading", { name: "No demonstration programmes match." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(
    page.getByRole("heading", { name: "Where this story sits." }),
  ).toBeVisible();
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
});
