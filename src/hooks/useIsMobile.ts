import { useState, useEffect } from "react";

/**
 * Returns true when the viewport is ≤767px (mobile).
 * SSR-safe: always returns false on the server / before hydration
 * so there is no layout-shift or hydration mismatch.
 * Uses matchMedia so it reacts to window resize / orientation change.
 */
export function useIsMobile(breakpoint = 767): boolean {
  // Start as false so SSR and the first client render match.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    // Set the correct value immediately after mount.
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // addListener is deprecated but some older browsers need it.
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      // @ts-ignore – fallback for Safari < 14
      mq.addListener(handler);
      // @ts-ignore
      return () => mq.removeListener(handler);
    }
  }, [breakpoint]);

  return isMobile;
}
