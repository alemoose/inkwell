// server/src/routes/post.routes.js
//
// Wires PostService to POST /api/posts and GET /api/posts.
// Lecture 9: GET /api/posts takes an optional ?search= instead of a
// separate /api/search endpoint (consistency, Lecture 7).
// Lecture 15: POST /api/posts requires a valid token, and the author is
// always taken from that token, never from the request body.

import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/posts", requireAuth, async (req, res) => {
  try {
    const { title, body, tagNames = [] } = req.body;
    // Never trust client-supplied identity fields. Any authorId in the
    // body is ignored; req.user is set by requireAuth from the verified JWT.
    const post = await PostService.publish({ authorId: req.user.id, title, body, tagNames });
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
    const { search, pageSize } = req.query; // pageSize is clamped in PostService
    const result = search
      ? await PostService.search({ query: search, page, pageSize })
      : await PostService.listPublished({ page, pageSize });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;