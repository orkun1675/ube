// Monotonic id generator for server-rendered markup that needs a unique id
// within a page render — e.g. <Term>'s pop-over and the button that targets
// it via `popovertarget` must share one id. Module-scoped, so the counter is
// shared across every import during a render pass: unique within a page,
// deterministic per build. React <Term> uses React's useId() instead; the
// two id formats never collide.
let counter = 0

export function uniqueId(prefix = "id"): string {
  counter += 1
  return `${prefix}-${counter}`
}
