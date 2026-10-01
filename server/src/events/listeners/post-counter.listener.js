// server/src/events/listeners/post-counter.listener.js
//
// Workshop 9, Exercise 1: a second listener on "post.published".
// Added without touching PostService, which is the Observer payoff.
// In-memory only, so the count resets when the server restarts.

import { EventBus } from "../event-bus.js";

let totalPostsPublished = 0;

EventBus.on("post.published", () => {
  totalPostsPublished += 1;
});

export function getTotalPostsPublished() {
  return totalPostsPublished;
}