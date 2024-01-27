import ResizeObserver from "resize-observer-polyfill";
import { useState, useEffect, useRef } from "react";

export default function useComponentSize(
  ref
): { width: number; height: number } {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const resizingDelayTimer = useRef<number | null>(null);

  useEffect(() => {
    const sizeObserver = new ResizeObserver(entries => {
      if (resizingDelayTimer.current) {
        clearTimeout(resizingDelayTimer.current);
      }
      entries.forEach(({ target }) => {
        resizingDelayTimer.current = setTimeout(() => {
          if (
            size.width !== target.clientWidth ||
            size.height !== target.clientHeight
          ) {
            setSize({ width: target.clientWidth, height: target.clientHeight });
          }
        }, 100);
      });
    });
    sizeObserver.observe(ref.current);

    return () => sizeObserver.disconnect();
  }, [ref]);

  return size;
}
