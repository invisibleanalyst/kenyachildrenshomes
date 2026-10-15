import { test, expect } from "@playwright/test";
import {
  initialState,
  reducer,
  funding,
  campaignMetrics,
} from "../src/shared/scenario";
test("funding excludes pending, pledges and unmatched; matching and confirmation are idempotent", () => {
  let s = initialState();
  expect(funding(s)).toMatchObject({
    confirmed: 60000,
    gap: 60000,
    pending: 10000,
    pledged: 20000,
  });
  s = reducer(s, { type: "matchPayment", id: "DEMO-UNMATCHED" });
  s = reducer(s, { type: "matchPayment", id: "DEMO-UNMATCHED" });
  expect(funding(s).confirmed).toBe(65000);
  s = reducer(s, {
    type: "paymentOutcome",
    id: "DEMO-PENDING",
    status: "confirmed",
  });
  s = reducer(s, {
    type: "paymentOutcome",
    id: "DEMO-PENDING",
    status: "confirmed",
  });
  expect(funding(s)).toMatchObject({ confirmed: 75000, pending: 0 });
  expect(s.review).toBeNull();
  expect(s.approved).toBe(false);
  expect(campaignMetrics(s)).toEqual({
    confirmed: 60000,
    net: 54000,
    repeat: 1,
    supporters: 1,
  });
});
test("workflow rejects skipped approvals and duplicate enquiry contributions", () => {
  let s = initialState();
  s = reducer(s, { type: "approve" });
  expect(s.approved).toBe(false);
  s = reducer(s, { type: "reviewAction", result: "delivered" });
  expect(s.review).toBeNull();
  s = reducer(s, { type: "linkedContribution", id: "ENQ-001" });
  expect(s.payments).toHaveLength(4);
  s = reducer(s, {
    type: "followUp",
    id: "ENQ-001",
    owner: "Supporter lead",
    response: "Answered",
  });
  s = reducer(s, { type: "linkedContribution", id: "ENQ-001" });
  s = reducer(s, { type: "linkedContribution", id: "ENQ-001" });
  expect(s.payments).toHaveLength(5);
  expect(s.action).toBeNull();
  expect(funding(s).confirmed).toBe(90000);
});
