// server/src/routes/stats.routes.js
//
// GET /api/stats exposes the in-memory publish counter (Exercise 1).
// Like health.routes.js, the logic is trivial enough to stay here.

import { Router } from "express";
import { getTotalPostsPublished } from "../events/listeners/post-counter.listener.js";

const router = Router();

router.get("/stats", (req, res) => {
  res.status(200).json({ totalPostsPublished: getTotalPostsPublished() });
});

export default router;