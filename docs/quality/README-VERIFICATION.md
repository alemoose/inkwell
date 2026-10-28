# README Verification - Lecture 14

Performed on this checkout, following README.md exactly, step by step,
with no undocumented prior knowledge assumed:

- [x] `git clone` + steps in "Getting Started" produce a running server
- [x] `git clone` + steps in "Getting Started" produce a running client
- [x] Every environment variable the app actually requires is documented
- [x] Every command shown in the README actually runs without modification

Result: 2 gaps found.

1. README.md had no "Getting Started" section at all: no clone
   instructions, no npm install, no Docker/Postgres setup, no DATABASE_URL
   format, no run commands, and no test commands. A genuine newcomer could
   not have gotten the app running from README.md alone at any point
   through Lecture 13. Fixed by adding a full "Getting Started" section:
   prerequisites, database setup (including the `docker start` vs
   `docker run` distinction from Lecture 8), server setup, client setup,
   and how to run all three test suites (including the separate
   `inkwell_test` database from Lecture 13).

2. `server/package.json`'s test script loads `server/.env.test`, but that
   file is gitignored and was never documented. On a fresh clone,
   `npm test` fails before any test runs. Fixed by documenting the file
   and its DATABASE_URL in the "Running the tests" section. Also
   documented the port 5433 fallback for machines where 5432 is already
   taken, which came up on this machine in Lecture 8.