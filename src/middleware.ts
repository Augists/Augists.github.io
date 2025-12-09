import type { MiddlewareHandler } from "astro";

// Quiet down DevTools/extension sourcemap lookups (e.g., installHook.js.map) that
// would otherwise hit the dynamic [...slug] route and spam warnings. We don't
// serve these files, so return an empty 204.
export const onRequest: MiddlewareHandler = async ({ url }, next) => {
  if (url.pathname.endsWith("/installHook.js.map")) {
    // Use 200 with empty body to avoid runtime rejecting 204 during dev
    return new Response("", {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return next();
};
