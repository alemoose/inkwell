// server/src/services/__tests__/post.service.test.js

import { jest } from "@jest/globals";

const mockPostRepository = { createWithTags: jest.fn(), searchPublished: jest.fn() };
const mockEventBus = { emit: jest.fn() };

jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
  PostRepository: mockPostRepository,
}));
jest.unstable_mockModule("../../events/event-bus.js", () => ({
  EventBus: mockEventBus,
}));

const { PostService } = await import("../post.service.js");

beforeEach(() => {
  jest.clearAllMocks();
});

test("publish() creates a PUBLISHED post and emits post.published", async () => {
  mockPostRepository.createWithTags.mockResolvedValue({ id: "p1", title: "Hello", status: "PUBLISHED" });

  const post = await PostService.publish({ authorId: "u1", title: "Hello", body: "World" });

  expect(post.status).toBe("PUBLISHED");
  expect(mockEventBus.emit).toHaveBeenCalledWith(
    "post.published",
    expect.objectContaining({ postId: "p1" })
  );
});

test("publish() rejects an empty title", async () => {
  await expect(
    PostService.publish({ authorId: "u1", title: "", body: "World" })
  ).rejects.toThrow();
});

// Exercise 1: PostService.search() test cases (Lecture 9)
describe("PostService.search", () => {
  test("returns matching posts for a query that has results (row 1)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({
      posts: [{ id: "p1", title: "Learning React" }],
      hasMore: false,
    });

    const result = await PostService.search({ query: "react" });

    expect(result.posts).toHaveLength(1);
    expect(result.posts[0].id).toBe("p1");
    expect(result.hasMore).toBe(false);
  });

  test("returns an empty list when nothing matches (row 2)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

    const result = await PostService.search({ query: "zzz-no-match" });

    expect(result.posts).toEqual([]);
    expect(result.hasMore).toBe(false);
  });

  test("defaults to page 1 and pageSize 10 when not given (row 3, white-box)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({ posts: [], hasMore: false });

    await PostService.search({ query: "react" });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
      query: "react",
      page: 1,
      pageSize: 10,
    });
  });

  test("passes a later page through and reports hasMore (row 4, boundary)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue({
      posts: [{ id: "p11" }],
      hasMore: true,
    });

    const result = await PostService.search({ query: "react", page: 2 });

    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
      query: "react",
      page: 2,
      pageSize: 10,
    });
    expect(result.hasMore).toBe(true);
  });
});