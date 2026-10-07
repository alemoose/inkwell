# Inkwell SQA Plan - v1

## Standards
- All code changes follow the PR checklist ([.github/PULL_REQUEST_TEMPLATE.md](../../.github/PULL_REQUEST_TEMPLATE.md), review logs in [docs/reviews/](../reviews/))
- Architecture conformance per ADR-001 ([docs/architecture/adr-001-modular.monolith.md](../architecture/adr-001-modular.monolith.md))
- API contract conventions per [docs/design/api-contract.md](../design/api-contract.md)

## Reviews
- Every merged change is self-reviewed (author) then peer-reviewed before merge
- Review findings logged in [docs/reviews/](../reviews/)

## Testing (expanded in Lectures 12-14)
- Unit tests: Services and Repositories (Jest), starting Lecture 12
- Integration tests: Routes (Supertest), starting Lecture 13
- End-to-end tests: critical user flows (Playwright), starting Lecture 14

## Defect Tracking
- All discovered defects (via review, testing, or manual use) recorded in [docs/quality/DEFECT-LOG.md](DEFECT-LOG.md)
- Each entry records: cause category, discovery stage, and remediation

## Metrics Tracked
- Defects per lecture/increment
- Defect cause category distribution
- Review turnaround (informal, tracked qualitatively at this project's scale)

## Ownership
- For this course project: the student/team implementing Inkwell owns SQA plan adherence.

## Metrics Snapshot (as of 2026-10-07, Lecture 11)
| Metric | Value | Source |
|--------|-------|--------|
| Commits | 15 | `git rev-list --count HEAD`, including the Lecture 11 commit |
| Logged defects | 1 | [DEFECT-LOG.md](DEFECT-LOG.md) (D-001) |
| Backlog items at "Requirements Defined" or later | 6 of 9 | [docs/BACKLOG.md](../BACKLOG.md): US-01 to US-04 (Requirements Defined), US-08 and US-09 (In Progress) |