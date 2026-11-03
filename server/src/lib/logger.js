// server/src/lib/logger.js
//
// Structured logging, made concrete: one shared logger instance,
// configured once, used everywhere, instead of a scattered mix of
// console.log/warn/error calls with no consistent shape.
// Tests run silent by default (Jest sets NODE_ENV=test) so test output
// stays readable; set LOG_LEVEL to see logs anyway.

import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "test" ? "silent" : "info"),
});