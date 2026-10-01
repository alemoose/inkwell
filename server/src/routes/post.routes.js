// server/src/routes/post.routes.js
//
// Wires PostService to POST /api/posts and GET /api/posts.
// Lecture 9: GET /api/posts takes an optional ?search= instead of a
// separate /api/search endpoint (consistency, Lecture 7).

import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { TokenService } from "../services/token.service.js";

const router = Router();

// Prefer the logged-in user from the Bearer token; fall back to
// authorId in the body so earlier lectures' requests still work.
function resolveAuthorId(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) {
    return TokenService.verifyAccessToken(header.slice(7)).sub;
  }
  return req.body.authorId;
}

router.post("/posts", async (req, res) => {
  let authorId;
  try {
    authorId = resolveAuthorId(req);
  } catch {
    return res.status(401).json({
      error: { code: "INVALID_TOKEN", message: "Access token is invalid or expired." },
    });
  }

  try {
    const { title, body, tagNames = [] } = req.body;
    const post = await PostService.publish({ authorId, title, body, tagNames });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({
      error: { code: err.code || "VALIDATION_ERROR", message: err.message },
    });
  }
});

router.get("/posts", async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const { search } = req.query;
    const result = search
      ? await PostService.search({ query: search, page })
      : await PostService.listPublished({ page });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;