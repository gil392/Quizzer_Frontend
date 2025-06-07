import { useEffect, useRef } from "react";

/** The effect is only applied from the time the deps change, skips the first initial time. */
export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return effect();
  }, deps);
}
