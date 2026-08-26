# Inkwell Product Backlog

Definition of Done: see README.md

| ID | User Story | Priority | Points | Status |
|----|------------|----------|--------|--------|
| US-01 | As a visitor, I want to register an account... | High | 3 | Backlog |
| US-02 | As a registered user, I want to log in... | High | 5 | Backlog |
| US-03 | As an author, I want to write and publish... | High | 5 | Backlog |
| US-04 | As a reader, I want to browse a public feed... | High | 3 | Backlog |
| US-05 | As a reader, I want to comment on a post... | Medium | 3 | Backlog |
| US-06 | As a reader, I want to follow an author... | Medium | 3 | Backlog |
| US-07 | As an author, I want basic analytics... | Low | 5 | Backlog |
| US-08 | As an author, I want to be able to edit my existing posts, so that I can correct errors after publishing without deleting and reposting. | Medium | 3 | Backlog |
| US-09 | As a registered user, I want to reset my password by email, so that I can regain access to my account if I forget it. | High | 5 | Backlog |

## Estimate Rationale
US-08 (3): I gave this 3 points because editing reuses most of the post form from US-03. The only new work is loading the existing post and saving over it instead of creating a new one.

US-09 (5): I gave this 5 points because it is the same size as US-02, since both deal with secure tokens. It also needs email sending, which the project does not have yet.