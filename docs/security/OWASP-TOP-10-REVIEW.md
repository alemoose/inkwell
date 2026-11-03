# Inkwell OWASP Top 10 Review (Lecture 16)

| # | Category | Status in Inkwell | Action |
|---|---|---|---|
| A01 | Broken Access Control | Found: the first route that acts on an existing post (DELETE /api/posts/:id) must check ownership, not just login | Fixed - Section 1.2 (ownership check + A01 regression test) |
| A02 | Cryptographic Failures | Passwords already hashed with bcrypt (Lecture 6); found: JWT secrets fell back to weak, hardcoded strings | Fixed - Section 1.3 (long random secrets in .env, never committed) |
| A03 | Injection | Prisma's parameterized queries already prevent SQL injection by default; verified, not fixed | No action needed, verified only |
| A04 | Insecure Design | Covered via Lecture 15's threat modeling; no new gap found this pass | No action needed |
| A05 | Security Misconfiguration | Found: the error handler returned raw internal error messages to the client in every environment | Fixed - Section 1.4 (generic message in production, details logged internally) |
| A06 | Vulnerable/Outdated Components | Found: high and critical findings in indirect dependencies via `npm audit` | Fixed - Section 1.5 (`npm audit fix` cleared all high/critical; remaining low/moderate are dev-only tooling that would need breaking upgrades) |
| A07 | Authentication Failures | Rate limiting and requireAuth already added (Lecture 15) | No new action needed |
| A08 | Software/Data Integrity | Deferred - full treatment in Lecture 20/21's pipeline integrity discussion | Deferred, flagged |
| A09 | Logging/Monitoring Failures | Found: no logging at all on failed login attempts | Fixed - Section 1.6 (structured pino log, event "auth.login.failed") |
| A10 | SSRF | Not yet applicable - no feature fetches a user-supplied URL; flagged for when avatar-by-URL is built | Flagged for future work |