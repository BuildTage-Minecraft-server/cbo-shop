import assert from "node:assert/strict";
import { mkdtemp, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

process.env.DATA_DIR = await mkdtemp(join(tmpdir(), "hub-apps-"));

const { cleanLabel, deleteApp, looksLikeApk, saveApp, saveAppFromUrl } = await import("../src/apps.js");
const { getStore } = await import("../src/store.js");

test("cleanLabel trims, limits and rejects empty names", () => {
  assert.equal(cleanLabel("  Browser  "), "Browser");
  assert.equal(cleanLabel("x".repeat(100)).length, 60);
  assert.throws(() => cleanLabel("   "));
});

test("saveApp stores the file and deleteApp removes it", async () => {
  const entry = await saveApp("Test app", Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x01]));
  assert.equal((await getStore()).apps.length, 1);
  assert.equal((await readdir(join(process.env.DATA_DIR!, "apps"))).length, 1);
  await deleteApp(entry.id);
  assert.equal((await getStore()).apps.length, 0);
  assert.equal((await readdir(join(process.env.DATA_DIR!, "apps"))).length, 0);
});

test("looksLikeApk checks the zip signature", () => {
  assert.equal(looksLikeApk(Buffer.from([0x50, 0x4b, 0x03, 0x04])), true);
  assert.equal(looksLikeApk(Buffer.from("<html>")), false);
  assert.equal(looksLikeApk(Buffer.alloc(0)), false);
});

test("saveAppFromUrl keeps an apk and rejects other content", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(new Uint8Array([0x50, 0x4b, 0x03, 0x04, 9, 9]));
    const entry = await saveAppFromUrl("From link", "https://example.com/a.apk");
    assert.equal((await getStore()).apps.some((app) => app.id === entry.id), true);
    await deleteApp(entry.id);

    globalThis.fetch = async () => new Response("<html>not an apk</html>");
    await assert.rejects(() => saveAppFromUrl("Bad", "https://example.com/page"));
    assert.equal((await getStore()).apps.length, 0);
    assert.equal((await readdir(join(process.env.DATA_DIR!, "apps"))).length, 0);

    await assert.rejects(() => saveAppFromUrl("Plain", "http://example.com/a.apk"));
  } finally {
    globalThis.fetch = original;
  }
});
