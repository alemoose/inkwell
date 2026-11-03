// server/src/routes/__tests__/posts.access-control.test.js
//
// A01 (Broken Access Control) regression tests for DELETE /api/posts/:id.

import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";
import {
  resetDatabase,
  createTestUser,
  createTestPost,
  tokenFor,
} from "../../test-utils/fixtures.js";

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("a user cannot delete another user's post (A01 regression test)", async () => {
  const owner = await createTestUser();
  const attacker = await createTestUser();
  const post = await createTestPost({ authorId: owner.id });

  const res = await request(app)
    .delete(`/api/posts/${post.id}`)
    .set("Authorization", `Bearer ${tokenFor(attacker)}`);

  expect(res.status).toBe(403);
  expect(await prisma.post.findUnique({ where: { id: post.id } })).not.toBeNull(); // still there
});

test("the owner can delete their own tagged post (cascade removes its tags)", async () => {
  const owner = await createTestUser();

  const publishRes = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${tokenFor(owner)}`)
    .send({ title: "Tagged", body: "Has tags.", tagNames: ["security"] });
  expect(publishRes.status).toBe(201);

  const res = await request(app)
    .delete(`/api/posts/${publishRes.body.id}`)
    .set("Authorization", `Bearer ${tokenFor(owner)}`);

  expect(res.status).toBe(204);
  expect(await prisma.post.findUnique({ where: { id: publishRes.body.id } })).toBeNull();
  expect(await prisma.postTag.count()).toBe(0);
});