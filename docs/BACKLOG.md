# Inkwell Product Backlog

Definition of Done: see README.md

| ID | User Story | Priority | Points | Status | Notes |
|----|------------|----------|--------|--------|--------|
| US-01 | As a visitor, I want to register an account... | High | 3 | Requirements Defined | See use-cases.md |
| US-02 | As a registered user, I want to log in... | High | 5 | Requirements Defined | See use-cases.md |
| US-03 | As an author, I want to write and publish... | High | 5 | Requirements Defined | Scope negotiated: plain text only, see Section 5.4 |
| US-04 | As a reader, I want to browse a public feed... | High | 3 | Requirements Defined | See use-cases.md |
| US-05 | As a reader, I want to comment on a post... | Medium | 3 | Backlog | |
| US-06 | As a reader, I want to follow an author... | Medium | 3 | Backlog | |
| US-07 | As an author, I want basic analytics... | Low | 5 | Backlog | |
| US-08 | As an author, I want to tag my post with one or more topics, so that readers can discover it by subject. | Medium | 3 | In Progress | |
| US-09 | As a reader, I want to search posts by keyword or tag, so that I can find content relevant to me. | Medium | 3 | In Progress | |

## Estimate Rationale
US-08 (3): I gave this 3 points because tagging adds two new tables (Tag and PostTag) and a small change to publishing, but reuses the existing post form and publish flow from US-03.

US-09 (3): I gave this 3 points because search reuses the existing paginated feed endpoint from US-04 with an optional search parameter, and starts with a simple substring match behind a Strategy so it can be upgraded later.