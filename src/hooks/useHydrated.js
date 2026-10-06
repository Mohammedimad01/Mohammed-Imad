import { useSyncExternalStore } from "react";

const noop = () => () => {};

// false on the server and during hydration, true afterwards. Use it to keep
// the first client render identical to the pre-rendered HTML wherever output
// depends on browser-only state (localStorage, portals, the clock).
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
