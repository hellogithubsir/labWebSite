import { expect, test } from "@playwright/test";

test("health response is an exact successful JSON status", async ({ request }) => {
  const response = await request.get("/healthz");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(
    /^application\/json(?:\s*;.*)?$/i,
  );
  expect(await response.json()).toEqual({ status: "ok" });
});
