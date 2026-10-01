// server/src/events/listeners/log-published-posts.listener.js
//
// The first, deliberately trivial listener. Proves the pattern works
// end-to-end. Real listeners are added later WITHOUT modifying
// PostService.publish() again; that is the pattern's actual payoff.

import { EventBus } from "../event-bus.js";

EventBus.on("post.published", (payload) => {
  console.log(`[event] post.published:`, payload);
});