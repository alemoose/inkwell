// server/src/middleware/rate-limit.middleware.js
//
// Security requirement, now enforced in code: "the system shall reject
// login attempts after five consecutive failures within ten minutes."
// skipSuccessfulRequests means only failed attempts count, so a real
// user who logs in fine is never locked out (and neither are the
// integration and E2E tests, which register and log in successfully).

import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: { error: { code: "TOO_MANY_ATTEMPTS", message: "Too many attempts. Try again later." } },
  standardHeaders: true,
  legacyHeaders: false,
});